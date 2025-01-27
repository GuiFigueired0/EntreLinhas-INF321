const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');
const User = require('./UserModel');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.data = null;
  }

  async register() {
    this.validate();
    if (this.errors.length > 0) return;
    
    await this.checkIfUserExists();
    if (this.errors.length > 0) return;
    
    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    
    const userData = {
      username: this.body.username,
      name: this.body.name,
    }

    const user = new User(userData);
    const createdUser = await user.create();
    try {
      const loginData = {
        email: this.body.email,
        password: this.body.password,
        user: createdUser._id
      }
      this.data = await LoginModel.create(loginData);
    } catch (e) {
      user.delete()
      this.errors.push(e);
    }
  }

  async login() {
    this.data = await LoginModel.findOne({ email: this.body.email }).populate('user');

    if (!this.data) {
      this.errors.push('User does not exist.');
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.data.password)) {
      this.errors.push('Invalid password.');
      this.data = null;
      return;
    }
  }

  async checkIfUserExists() {
    this.data = await LoginModel.findOne({ email: this.body.email });
    if (this.data) this.errors.push('User already exists.');
  }

  validate() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) this.errors.push('Invalid email.');
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.errors.push('The password must be between 3 and 50 characters.');
    }
    if (!this.body.username || this.body.username.length < 3) {
      this.errors.push('The username must be at least 3 characters long.');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
      username: this.body.username || '',
      name: this.body.name || ''
    };
  }
}

module.exports = Login;
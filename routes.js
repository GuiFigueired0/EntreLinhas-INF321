const express = require('express');
const route = express.Router();

const viewsController = require('./src/controllers/viewsController');

const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const bookController = require('./src/controllers/bookController');
const seriesController = require('./src/controllers/seriesController');
const authorController = require('./src/controllers/authorController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da views
route.get('/', viewsController.index);
route.get('/db_playground', viewsController.db_playground);
route.get('/list', viewsController.list);
route.get('/book', viewsController.book);
route.get('/profile', viewsController.profile);
route.get('/list_group', viewsController.list_group);

// Rotas de usuário 
route.get('/user/find/:id', userController.findById);
route.put('/user/update/:id', userController.updateById);

// Rotas de login
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de Livro
route.post('/books', bookController.create); 
route.get('/books/genre/:genre', bookController.findByGenre); 
route.get('/books/search/:title', bookController.searchByTitle); 
route.get('/books/similar/:id', bookController.findSimilarBooks);
route.get('/books/find/:id', bookController.findById); 

// Rotas de Série
route.post('/series', seriesController.create); 
route.get('/series/find/:id', seriesController.findById); 

// Rotas de Autor
route.post('/author', authorController.create); 
route.get('/author/find/:id', authorController.findById); 

module.exports = route;

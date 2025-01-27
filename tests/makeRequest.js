require('dotenv').config();
const axios = require('axios');

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

async function makeRequest(method, endpoint, data = null, verbose = true) {
  try {
    const url = `${baseURL}${endpoint}`;
    const options = { method, url, data };
    const response = await axios(options);

    if (verbose) {
      console.log(`✅ [${method}] ${url}`);
      console.log('Response:', response.data);
    }
    return response.data;
  } catch (error) {
    console.error(`❌ [${method}] ${endpoint}`);
    console.error('Error:', error.response?.data || error.message);
  }
}

async function login(loginData = {
  email: 'testemail@gmail.com',
  password: '123456',
}) {
  const data = await makeRequest('POST', '/login/login', loginData, false);
  return (data) ? data.user : null;
}

exports.makeRequest = makeRequest;
exports.login = login;
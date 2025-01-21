const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const bookController = require('./src/controllers/bookController');
const seriesController = require('./src/controllers/seriesController');
const playgroundController = require('./src/controllers/playgroundController');

const { loginRequired } = require('./src/middlewares/middleware');

// Rotas da home
route.get('/', homeController.index);

// Rota do DB Playground
route.get('/db_playground', playgroundController.index);

// Rotas de login
route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de Livro
route.post('/books', bookController.create); 
route.get('/books/genre/:genre', bookController.findByGenre); 
route.get('/books/:id', bookController.findById); 
route.get('/books/search/:title', bookController.searchByTitle); 
route.get('/books/:id/similar', bookController.findSimilarBooks);

// Rotas de Série
route.post('/series', seriesController.create); 
route.get('/series/:id', seriesController.findById); 
route.get('/series/books/:id', seriesController.findBooksById); 

// Rotas de contato
route.get('/contato/index', loginRequired, contatoController.index);
route.post('/contato/register', loginRequired, contatoController.register);
route.get('/contato/index/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;

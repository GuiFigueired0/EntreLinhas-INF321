const express = require('express');
const route = express.Router();

const viewsController = require('./src/controllers/viewsController');

const userController = require('./src/controllers/userController');
const loginController = require('./src/controllers/loginController');
const bookController = require('./src/controllers/bookController');
const seriesController = require('./src/controllers/seriesController');
const authorController = require('./src/controllers/authorController');
const bookshelfController = require('./src/controllers/bookshelfController');
const connectionController = require('./src/controllers/connectionController');

const { loginRequired } = require('./src/middlewares/middleware');

// Views routes
route.get('/', viewsController.index);
route.get('/db_playground', viewsController.db_playground);
route.get('/list', viewsController.list);
route.get('/book', viewsController.book);
route.get('/profile', viewsController.profile);
route.get('/list_group', viewsController.list_group);

// User routes
route.get('/user/find/:id', userController.findById);
route.put('/user/update/:id', userController.updateById);

// Login routes
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Book routes
route.post('/books', bookController.create); 
route.get('/books/genre/:genre', bookController.findByGenre); 
route.get('/books/search/:title', bookController.searchByTitle); 
route.get('/books/similar/:id', bookController.findSimilarBooks);
route.get('/books/find/:id', bookController.findById); 

// Series routes
route.post('/series', seriesController.create); 
route.get('/series/find/:id', seriesController.findById); 

// Author routes
route.post('/author', authorController.create); 
route.get('/author/find/:id', authorController.findById); 

// Bookshelf routes
route.post('/bookshelf', bookshelfController.create);
route.get('/bookshelf/find/:id', bookshelfController.findById);
route.get('/bookshelf/books/:id', bookshelfController.getBooks);
route.get('/bookshelf/owner/:owner', bookshelfController.findByOwner);
route.delete('/bookshelf/delete/:id', bookshelfController.deleteBookshelf);
route.post('/bookshelf/info', bookshelfController.getBookshelvesInfo);
route.post('/bookshelf/remove-book', bookshelfController.removeBook);
route.post('/bookshelf/save', bookshelfController.saveBookshelf);
route.post('/bookshelf/add-book', bookshelfController.addBook);

// Connection routes
route.post('/connections', connectionController.create);
route.get('/connections/user/:follower', connectionController.findUserConnections);
route.get('/connections/followers/:user', connectionController.findFollowers);
route.delete('/connections/:id', connectionController.deleteConnection);

module.exports = route;

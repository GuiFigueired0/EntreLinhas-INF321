const express = require('express');
const route = express.Router();

const viewsController = require('./src/controllers/viewsController');

const userController = require('./src/controllers/userController');
const bookController = require('./src/controllers/bookController');
const loginController = require('./src/controllers/loginController');
const seriesController = require('./src/controllers/seriesController');
const authorController = require('./src/controllers/authorController');
const bookshelfController = require('./src/controllers/bookshelfController');
const connectionController = require('./src/controllers/connectionController');
const readingHistoryController = require('./src/controllers/readingHistoryController');
const bookStateController = require('./src/controllers/bookStateController');
const activityController = require('./src/controllers/activityController');
const reviewController = require('./src/controllers/reviewController');
const { loginRequired } = require('./src/middlewares/middleware');

// Views routes
route.get('/db_playground', viewsController.db_playground);
route.get('/list', viewsController.list);
route.get('/book', viewsController.book);
route.get('/list_group', viewsController.list_group);

route.get('/login', viewsController.login);
route.get('/', loginRequired, viewsController.index);
route.get('/search', loginRequired, viewsController.search);
route.get('/series/view/:id', loginRequired, viewsController.series);
route.get('/author/view/:id', loginRequired, viewsController.author);
route.get('/book/view/:id', loginRequired, viewsController.book);
route.get('/profile/view/:id', loginRequired, viewsController.profile);
route.get('/genre/view/:genre', loginRequired, viewsController.genre);

// User routes
route.get('/user/find/:id', userController.findById);
route.put('/user/update/:id', userController.updateById);
route.get('/user/search/:username', userController.searchByUsername); 

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
route.get('/series/search/:name', seriesController.searchByName); 

// Author routes
route.post('/author', authorController.create); 
route.get('/author/find/:id', authorController.findById); 
route.get('/author/search/:name', authorController.searchByName); 

// Bookshelf routes
route.post('/bookshelves', bookshelfController.create);
route.get('/bookshelves/find/:id', bookshelfController.findById);
route.get('/bookshelves/books/:id', bookshelfController.getBooks);
route.get('/bookshelves/owner/:owner', bookshelfController.findByOwner);
route.delete('/bookshelves/delete/:id', bookshelfController.deleteBookshelf);
route.post('/bookshelves/info', bookshelfController.getBookshelvesInfo);
route.post('/bookshelves/remove-book', bookshelfController.removeBook);
route.post('/bookshelves/save', bookshelfController.saveBookshelf);
route.post('/bookshelves/add-book', bookshelfController.addBook);

// Connection routes
route.post('/connections', connectionController.create);
route.get('/connections/user/:follower', connectionController.findUserConnections);
route.get('/connections/followers/:user', connectionController.findFollowers);
route.delete('/connections/delete/:id', connectionController.deleteConnection);

// BookState routes
route.post('/book-states/mark', bookStateController.mark);
route.get('/book-states/user-state/:user/:state', bookStateController.findUserState);
route.get('/book-states/find/:id', bookStateController.findById);
route.delete('/book-states/delete/:id', bookStateController.delete);

// ReadingHistory routes
route.post('/reading-history', readingHistoryController.create);
route.get('/reading-history/find/:user/:book', readingHistoryController.findBookHistory);
route.delete('/reading-history/delete/:id', readingHistoryController.delete);

// Review routes
route.post('/reviews', reviewController.create);
route.get('/reviews/find/:id', reviewController.findById);
route.get('/reviews/book/:id', reviewController.findBookReviews);
route.get('/reviews/user/:id', reviewController.findUserReviews);
route.put('/reviews/update/:id', reviewController.update);
route.delete('/reviews/delete/:id', reviewController.delete);

// Activity routes
route.get('/activity/feed/:id', activityController.getFeed);
route.get('/activity/user/:id', activityController.getUserFeed);

module.exports = route;

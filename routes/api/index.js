// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// //to import all API routes to prefix their endpoint names and package them

const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');

//adding prefix of '/users' to routes created in 'user-routes.js'
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


module.exports = router;

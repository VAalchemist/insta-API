const router = require('express').Router();

const res = require('express/lib/response');
//import all API routes
const apiRoutes = require('./api');

//prefix of `api` to all api routes imported from `api` dir
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
const express = require('express');
const router = express.Router();
const dashboard = require('../controller/dashboard')
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

/* GET home page. */
router.get('/home', [ValidationMiddleware.validLogin, dashboard.home]);

module.exports = router;

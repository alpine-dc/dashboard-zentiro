const express = require('express');
const router = express.Router();
const contact = require('../controller/contact_us')
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');

router.get('/contact-us', [ValidationMiddleware.validLogin, contact.findAll]);
router.post('/update/contact-us', [ValidationMiddleware.validLogin, contact.updateStatus]);


module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../config/connection');

router.use(express.static('public'));

router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var path = require('path')

let webController = require('../controllers/web')


// do not modify
router.get('*', webController.index);

module.exports = router;

var express = require('express');
var dns = require('dns');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Validate Domain . */
router.post('/validate', function(req, res, next) {
  let record = req.body.record
  
});


module.exports = router;

var express = require('express');
var router = express.Router();

/* Test API . */
router.get('/', function(req, res, next) {
  res.json({
      title: 'DNS Record Validator',
      status: 0,
      message: 'Works'
  })
});

/* Validate Domain API. */
router.post('/validate', function(req, res, next) {
   
});


module.exports = router;

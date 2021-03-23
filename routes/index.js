var express = require('express');
var dns = require('dns');
const { check, validationResult } = require('express-validator')
var router = express.Router();
var {validateDNS}  = require('./../middlewares/mixins')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'DNS Record Validator'
  });
});

/* Validate Domain . */
router.post('/validate', [
  check('hostname', 'DNS hostname is required').exists().not().isEmpty(),
  check('type', 'DNS type is not valid') .exists().not().isEmpty()
], function (req, res, next) {
  const errors = validationResult(req.body)
  if (!errors.isEmpty()) {
    // return res.status(422).jsonp(errors.array())
    return res.render('index', {
      title: 'DNS Record Validator',
      errors: errors.array()
    })
  }
  let hostname = req.body.hostname
  let type = req.body.type
  if (validateDNS(hostname)) {
    dns.resolve(hostname , type , (err, addresses) => {
      if (err) {
        return res.render('index', {
          title: 'DNS Record Validator',
          errors: [{msg: `${err.code}: Invalid DNS record`}],
          err
        })
      };
      console.log('addresses ' , addresses)
      return res.render('index', {
        title: 'DNS Record Validator',
        message: 'Valid DNS Record',
        addresses
      })
    })
  } else {
    return res.render('index', {
      title: 'DNS Record Validator',
      errors: [{msg: 'Invalid DNS record'}]
    })
  }
});


module.exports = router;

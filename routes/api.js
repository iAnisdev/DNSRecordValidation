var express = require('express');
var dns = require('dns');
const { check, validationResult } = require('express-validator')
var router = express.Router();
var {validateDNS}  = require('./../middlewares/mixins')

//API documentation setup


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../docs/swagger.json');

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));
/* Test API . */
router.get('/validate', function(req, res, next) {
  res.json({
      title: 'DNS Record Validator',
      status: 0,
      message: 'Works'
  })
});

/* Validate Domain API. */
router.post('/validate', [
  check('hostname', 'DNS hostname is required').exists().not().isEmpty(),
  check('type', 'DNS type is not valid').exists().not().isEmpty()
], function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: -1,
      errors: errors.array()
    })
  }
  let hostname = req.body.hostname
  let type = req.body.type
  if (validateDNS(hostname)) {
    dns.resolve(hostname , type , (err, addresses) => {
      if (err) {
        return res.json({
          status: -1,
          errors: [{msg: 'Invalid DNS record', code : err.code}]
        })
      }
      return res.json({
        status: 0,
        message: 'Valid DNS Record',
        addresses
      })
    })
  } else {
    return res.json({
      status: -1,
      errors: [{msg: 'Invalid DNS record', code : 'INVALID'}]
    })
  }
   
});


module.exports = router;

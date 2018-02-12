const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://trieutn.auth0.com/.well-known/jwks.json"
  }),
  audience: 'https://scotchvue2store.com',
  issuer: "https://trieutn.auth0.com/",
  algorithms: ['RS256']
});
const router = express.Router();
const productController      = require('../../controllers/product');
const manufacturerController = require('../../controllers/manufacturer');

router.get('/manufacturers', manufacturerController.all);
router.get('/manufacturers/:id', manufacturerController.byID);
router.post('/manufacturers', authCheck, manufacturerController.create);
router.put('/manufacturers/:id', authCheck, manufacturerController.update);
router.delete('/manufacturers/:id', authCheck, manufacturerController.delete);

router.get('/products', productController.all);
router.get('/products/:id', productController.byId);
router.post('/products', authCheck, productController.create);
router.put('/products/:id', authCheck, productController.update);
router.delete('/products/:id', authCheck, productController.remove);

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('respond with a resource in api');
});

module.exports = router;
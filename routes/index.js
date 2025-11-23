var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Expense Tracker'
   });
});

/* GET See Expenses page. */
router.get('/expenses', function(req, res, next) {
  res.render('index', { 
    title: 'Track Expenses'
   });
});

/* GET Contact page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { 
    title: 'Contact us'
   });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('index', { 
    title: 'About us'
   });
});

module.exports = router;

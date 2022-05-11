var express = require('express');
var router = express.Router();
// const async = require('hbs/lib/async');
const db = require('../config/db-connect');
db.connect();

/* GET users listing. */
router.get('/',(req, res) =>{
  res.render('users');
});


module.exports = router;

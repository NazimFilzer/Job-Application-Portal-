var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
// const async = require('hbs/lib/async');
const db = require('../config/db-connect');
db.connect();

/* GET users listing. */
router.get('/',async(req, res) =>{
  let products = await db.get().collection("items").find().toArray();

  res.render('users',{style:'users.css',products});
});


module.exports = router;

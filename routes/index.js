var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
const db = require('../config/db-connect');
db.connect();

/* GET admin page. */
router.get('/admin', async (req, res, next) => {

  let products = await db.get().collection("items").find().toArray();
  res.render('index', { products,style:"style.css" });

});

router.post('/admin',async(req,res)=>{
  
  db.get().collection("items").insertOne(req.body).then(()=>{
    console.log("Job Details Pushed");
  })
  res.render('success',{name:req.body.name,role:req.body.role,company:req.body.company,desc:req.body.desc})

})

router.get('/admin/edit', async(req,res)=>{
  res.send("edit page")
})



module.exports = router;


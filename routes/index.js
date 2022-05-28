var express = require('express');
const { set } = require('express/lib/application');
const req = require('express/lib/request');
const { route } = require('express/lib/router');
const async = require('hbs/lib/async');
const bycrypt = require('bcryptjs')
var router = express.Router();
var objectId = require('mongodb').ObjectId
const db = require('../config/db-connect');
db.connect();

/* Showing Detais on card. */
router.get('/admin', async (req, res, next) => {
  
  let products = await db.get().collection("items").find().toArray();
  res.render('index', { products, style: "style.css" });
});
/* Showing Detais on card. */

// Recieving Info via form
router.post('/admin', async (req, res) => {
  db.get().collection("items").insertOne(req.body).then(() => {
    console.log("Job Details Pushed");
  })
  res.render('success', { name: req.body.name, role: req.body.role, company: req.body.company, desc: req.body.desc })
  
})
// Recieving Info via form



// Edit Page
router.get("/admin/edit/:id",async (req,res)=>{
  let products = await db.get().collection("items").find().toArray();
  res.render('edit',{products, style:"edit.css"})
})

router.post('/admin/edit/:id', async (req, res) => {
  let job_id = req.params.id;
  db.get().collection('items').updateOne({ _id: objectId(job_id) }, {
    $set: {
      name: req.body.name,
      role: req.body.role,
      company: req.body.company,
      desc: req.body.desc
    }
  }
  ) 
  res.redirect('/admin')
})
// Edit Page

// deleting
router.get('/admin/:id', (req, res) => {
  let job_id = req.params.id;
  db.get().collection("items").deleteOne({ _id: objectId(job_id) }).then(() => {
    console.log("Deleted the data");
    res.redirect('/admin');
  })
  
})
// deleting

// loginpage
router.get('/login',(req,res)=>{
  res.render('login');
})
router.post("/login",async(req,res)=>{
  let user=await db.get().collection("accounts").findOne({username:req.body.username})
  if(user){
    bcrypt.compare(req.body.password,user.password).then((data)=>{
  if (data) res.redirect('/admin');
      else  res.send("Wrong Password");
    })
  }

})

// signup page
router.get('/signup',(req,res)=>{
  res.render('signup')
})
router.post("/signup",async(req,res)=>{
  req.body.password=  await bcrypt.hash(req.body.password,10)
  db.get().collection("accounts").insertOne(req.body).then(()=>{
    console.log("Acc created");
    res.send("Acc Created");
  })
})
// signup page



module.exports = router;


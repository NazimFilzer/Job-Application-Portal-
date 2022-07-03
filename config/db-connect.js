require('dotenv').config()
const Mongoclient= require("mongodb").MongoClient
const dbname="jobs";
let db=null;
// console.log(process.env)
const client=new Mongoclient(process.env.URL)

module.exports.connect=()=>{
    client.connect((err,data)=>{
        if (err) console.log(err);
        else{
            console.log("Database connected")
            db=data.db(dbname) 
        }
    })
}

module.exports.get=()=>{
    return db;
}
const Mongoclient= require("mongodb").MongoClient
const url="mongodb://localhost:27017/jobs";
const dbname="jobs";
let db=null;
const client=new Mongoclient(url)

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
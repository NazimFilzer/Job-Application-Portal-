const Mongoclient= require("mongodb").MongoClient
const url="mongodb+srv://nazimfilzer:123@cluster0.cdask.mongodb.net/jobs";
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
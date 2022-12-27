const express = require('express');
const app = express();
const cors = require("cors");
var bodyParser = require('body-parser'); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended :true}))
console.log("App listen at port 5000");
//app.use(express.json());
app.use(cors());

const mongoose = require('mongoose');
const { json } = require('body-parser');
mongoose.connect('mongodb://127.0.0.1:27017/', {
    dbName: 'imdb',
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => err ? console.log(err) : 
    console.log('imdb'));


const MoviesSchema = new mongoose.Schema({
    Profile: {
        Name : {
            Type : String ,
            required : true   
        }, 
        ProfileUrl : {
            Type : String ,
            required : true   
        }, 
        About : {
            Type : String ,
            required : true   
        }, 
        Email : {
            Type : String , 
            required : true 
        }
    } 
});
var Movies = mongoose.model("Movies" ,MoviesSchema ); 
Movies.createIndexes();

app.get("/",  (req, resp) => {
    resp.send("APP WORKING"); 
});
app.get("/search",  (req, resp) => {
     console.log(req);
     Movies.find({title : req.query.title} , function(err , docs){
         if(err){
            console.log(err); 
         }else{
            resp.send(docs) 
         }
     });

});

app.post("/review",  (req, resp) => {
        var data = new Movies(req.body);  
        data.save().then(()=>{
            resp.send("success")
        }).catch(err =>{
            resp.status(400).send("failed")
        })
});
app.listen(5000);

var express = require("express");
var mongoose = require("mongoose");
var bodyParSer = require("body-parser");

var cors = require("cors");
var path = require("path");
var app = express();

const port = 3000;
const route = require("./routes/route");

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/contactlist', {useMongoClient: true});

//on connection
mongoose.connection.on("connected",()=>{
    console.log("connected to database mongodb @ 27017")
});

mongoose.connection.on("error",(err)=>{
    if(err){
        console.log("Error in Database connection" + err);
    }
});


app.use(cors());
app.use(bodyParSer.json());
app.use(express.static(path.join(__dirname, 'public')))

app.get("/" , (req, res)=>{
    res.send("homepage");
})

app.use('/api', route);
app.listen(port, ()=>{
    console.log("Server started at port :" + port);
})  
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var Data;

const app=express();

app.set('view engine',"ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/timetableDB');

  //Defining timetableSchema to store the details
  const timetableSchema=new mongoose.Schema({
  subname:String,
  fname:String,
  classes:Number

});
 Data=mongoose.model("Data",timetableSchema);
}

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const subjectName=req.body.subname;
  const facultyName=req.body.fname;
  const classesPerWeek=req.body.classes;

  const newData=new Data({
    subname:subjectName,
    fname:facultyName,
    classes:classesPerWeek
  });
  newData.save(function(err){
    if(!err){
      res.send("Sucessfully added new articles");
    }else{
      res.send(err);
    }
  });
  console.log(subjectName + " " + facultyName + " " + classesPerWeek);
  console.log("Form accepted");
});
app.post("/delete",function(req,res){
  const subjectName=req.body.subname;
  const facultyName=req.body.fname;
  const classesPerWeek=req.body.classes;

  Data.findByIdAndRemove(subjectName,function(err){
    if(!err){
      console.log("Successfully deleted the data");
    }
    res.redirect("/");
  });
});

app.listen(3000,function(){
  console.log("Server running at port 3000");
});

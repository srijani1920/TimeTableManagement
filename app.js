const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var Subject;

const app=express();
mongoose.set('strictQuery', false);

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
  subcode:String,
  classes:Number

});
 Subject=mongoose.model("Subject",timetableSchema);
}

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.get("/admin",function(req,res){
  res.sendFile(__dirname+"/admin-panel.html");
});
app.get("/subjectdetails",function(req,res){
  res.sendFile(__dirname+"/subject-details.html");
});
app.post("/subjectdetails",function(req,res){
  const subjectName=req.body.subname;
  const facultyName=req.body.fname;
  const subjectCode=req.body.subcode;
  const classesPerWeek=req.body.classes;

  const newSubject=new Subject({
    subname:subjectName,
    fname:facultyName,
    subcode:subjectCode,
    classes:classesPerWeek
  });
  newSubject.save(function(err){
    if(!err){
      res.send("Sucessfully added new articles");
    }else{
      res.send(err);
    }
  });
  console.log(subjectName + " " + facultyName + " " + subjectCode +" " + classesPerWeek);
  console.log("Form accepted");
  
});
// app.post("/delete",function(req,res){
//   const subjectName=req.body.subname;
//   const facultyName=req.body.fname;
//   const subjectCode=req.body.subcode;
//   const classesPerWeek=req.body.classes;
//
//   Subject.findByIdAndRemove(subjectName,function(err){
//     if(!err){
//       console.log("Successfully deleted the data");
//     }
//     res.redirect("/");
//   });
// });

app.listen(3000,function(){
  console.log("Server running at port 3000");
});

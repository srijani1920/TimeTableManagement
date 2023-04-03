const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var Subject;
var Lecturer;
var TimeTable;

const app=express();
mongoose.set('strictQuery', false);

app.set('view engine',"ejs");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/timetableDB');

  //Defining timetableSchema to store the details
  const subjectSchema=new mongoose.Schema({
  subname:String,
  fname:String,
  subcode:String,
  classes:Number

});
const lectureSchema=new mongoose.Schema({
  lname:String,
  lid:String,
  ldept:String
});
const timetableSchema= new mongoose.Schema({
  monp1subcode:String,
  monp1fname:String,
  monp2subcode:String,
  monp2fname:String,
  monp3subcode:String,
  monp3fname:String,
  monp4subcode:String,
  monp4fname:String,
  monp5subcode:String,
  monp5fname:String,

  tuep1subcode:String,
  tuep1fname:String,
  tuep2subcode:String,
  tuep2fname:String,
  tuep3subcode:String,
  tuep3fname:String,
  tuep4subcode:String,
  tuep4fname:String,
  tuep5subcode:String,
  tuep5fname:String,

  wedp1subcode:String,
  wedp1fname:String,
  wedp2subcode:String,
  wedp2fname:String,
  wedp3subcode:String,
  wedp3fname:String,
  wedp4subcode:String,
  wedp4fname:String,
  wedp5subcode:String,
  wedp5fname:String,

  thurp1subcode:String,
  thurp1fname:String,
  thurp2subcode:String,
  thurp2fname:String,
  thurp3subcode:String,
  thurp3fname:String,
  thurp4subcode:String,
  thurp4fname:String,
  thurp5subcode:String,
  thurp5fname:String,

  frip1subcode:String,
  frip1fname:String,
  frip2subcode:String,
  frip2fname:String,
  frip3subcode:String,
  frip3fname:String,
  frip4subcode:String,
  frip4fname:String,
  frip5subcode:String,
  frip5fname:String




}) ;
 Lecturer=mongoose.model("Lecturer",lectureSchema);
 Subject=mongoose.model("Subject",subjectSchema);
 TimeTable=mongoose.model("TimeTable",timetableSchema);
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
app.get("/lecturerdetails",function(req,res){
  res.sendFile(__dirname+"/lecturer-details.html");
});
app.get("/lecturerform",function(req,res){
  res.sendFile(__dirname+"/lecturer-form.html");
})
app.get("/timetabledetails",function(req,res){
  res.sendFile(__dirname+"/timetable-details.html")
});
app.get("/form",function(req,res){
  res.sendFile(__dirname+"/form.html")
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
app.post("/lecturerform",function(req,res){
  const lecturerName=req.body.fname;
  const lecturerID=req.body.fid;
  const dept=req.body.dept;

  const newLecturer= new Lecturer({
    lname:lecturerName,
    lid:lecturerID,
    ldept:dept
  });
  newLecturer.save(function(err){
    if(!err){
      res.send("Sucessfully added new articles");
    }else{
      res.send(err);
    }
  });
  console.log(lecturerName + " " + lecturerID+ " " + dept +" " );
  console.log("Form accepted");
});

app.post("/form",function(req,res){
  const mon1sname=req.body.monp1subname;
  const mon1fname=req.body.monp1fname;
  const mon2sname=req.body.monp2subname;
  const mon2fname=req.body.monp2fname;
  const mon3sname=req.body.monp3subname;
  const mon3fname=req.body.monp3fname;
  const mon4sname=req.body.monp4subname;
  const mon4fname=req.body.monp4fname;
  const mon5sname=req.body.monp5subname;
  const mon5fname=req.body.monp5fname2;

  const tue1sname=req.body.tuep1subname;
  const tue1fname=req.body.tuep1fname;
  const tue2sname=req.body.tuep2subname;
  const tue2fname=req.body.tuep2fname;
  const tue3sname=req.body.tuep3subname;
  const tue3fname=req.body.tuep3fname;
  const tue4sname=req.body.tuep4subname;
  const tue4fname=req.body.tuep4fname;
  const tue5sname=req.body.tuep5subname;
  const tue5fname=req.body.tuep5fname2;

  const wed1sname=req.body.wedp1subname;
  const wed1fname=req.body.wedp1fname;
  const wed2sname=req.body.wedp2subname;
  const wed2fname=req.body.wedp2fname;
  const wed3sname=req.body.wedp3subname;
  const wed3fname=req.body.wedp3fname;
  const wed4sname=req.body.wedp4subname;
  const wed4fname=req.body.wedp4fname;
  const wed5sname=req.body.wedp5subname;
  const wed5fname=req.body.wedp5fname2;

  const thur1sname=req.body.thurp1subname;
  const thur1fname=req.body.thurp1fname;
  const thur2sname=req.body.thurp2subname;
  const thur2fname=req.body.thurp2fname;
  const thur3sname=req.body.thurp3subname;
  const thur3fname=req.body.thurp3fname;
  const thur4sname=req.body.thurp4subname;
  const thur4fname=req.body.thurp4fname;
  const thur5sname=req.body.thurp5subname;
  const thur5fname=req.body.thurp5fname2;

  const fri1sname=req.body.frip1subname;
  const fri1fname=req.body.frip1fname;
  const fri2sname=req.body.frip2subname;
  const fri2fname=req.body.frip2fname;
  const fri3sname=req.body.frip3subname;
  const fri3fname=req.body.frip3fname;
  const fri4sname=req.body.frip4subname;
  const fri4fname=req.body.frip4fname;
  const fri5sname=req.body.frip5subname;
  const fri5fname=req.body.frip5fname2;

//Adding retrieved data to mongoDB database
  const newTimeTable = new TimeTable({
    monp1subcode:mon1sname,
    monp1fname:mon1fname,
    monp2subcode:mon2sname,
    monp2fname:mon2fname,
    monp3subcode:mon3sname,
    monp3fname:mon3fname,
    monp4subcode:mon4sname,
    monp4fname:mon4fname,
    monp5subcode:mon5sname,
    monp5fname:mon5fname,

    tuep1subcode:tue1sname,
    tuep1fname:tue1fname,
    tuep2subcode:tue2sname,
    tuep2fname:tue2fname,
    tuep3subcode:tue3sname,
    tuep3fname:tue3fname,
    tuep4subcode:tue4sname,
    tuep4fname:tue4fname,
    tuep5subcode:tue5sname,
    tuep5fname:tue5fname,

    wedp1subcode:wed1sname,
    wedp1fname:wed1fname,
    wedp2subcode:wed2sname,
    wedp2fname:wed2fname,
    wedp3subcode:wed3sname,
    wedp3fname:wed3fname,
    wedp4subcode:wed4sname,
    wedp4fname:wed4fname,
    wedp5subcode:wed5sname,
    wedp5fname:wed5fname,

    thurp1subcode:thur1sname,
    thurp1fname:thur1fname,
    thurp2subcode:thur2sname,
    thurp2fname:thur2fname,
    thurp3subcode:thur3sname,
    thurp3fname:thur3fname,
    thurp4subcode:thur4sname,
    thurp4fname:thur4fname,
    thurp5subcode:thur5sname,
    thurp5fname:thur5fname,

    frip1subcode:fri1sname,
    frip1fname:fri1fname,
    frip2subcode:fri2sname,
    frip2fname:fri2fname,
    frip3subcode:fri3sname,
    frip3fname:fri3fname,
    frip4subcode:fri4sname,
    frip4fname:fri4fname,
    frip5subcode:fri5sname,
    frip5fname:fri5fname
  });

  newTimeTable.save(function(err){
    if(!err){
      res.send("Sucessfully added new articles");
    }else{
      res.send(err);
    }
  });
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

const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var Subject;
var Lecturer;
var TimeTable;

const app=express();
app.set('view engine',"ejs");
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
// app.get("/subjectdetails",function(req,res){
//   res.sendFile(__dirname+"/subject-details.html");
// });
app.get("/subjectdetailsform",function(req,res){
  res.sendFile(__dirname+"/subject-details-form.html");
});
app.get("/subjectdetails",function(req,res){
  Subject.find({},function(err,foundData){
    if(!err){
      if(foundData){
        res.render("subject-details",{subjectData:foundData});
      }
    }else{
      console.log(err);
    }
  });
});
app.get("/lecturerdetails",function(req,res){
  Lecturer.find({},function(err,foundData){
    if(!err){
      if(foundData){
        res.render("lecturer-details",{teacherData:foundData});
      }
    }else{
      console.log(err);
    }

  });

});
app.get("/lecturerform",function(req,res){
  res.sendFile(__dirname+"/lecturer-form.html");
})
app.get("/timetabledetails",function(req,res){
  res.sendFile(__dirname+"/timetable-details.html")
});
app.get("/timetableform",function(req,res){
  res.sendFile(__dirname+"/timetable-entry-form.html")
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
      res.sendFile(__dirname+"/success/successsubject.html");
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

  // Lecturer.exists({lid:lecturerID},function(err,result){
  //   if(result===true){
  //     prompt("data already exists");
  //   }
  //   console.log(result);
  // });






  const newLecturer= new Lecturer({
    lname:lecturerName,
    lid:lecturerID,
    ldept:dept
  });
  newLecturer.save(function(err){
    if(!err){
    res.sendFile(__dirname+"/success/successlecture.html");
    }else{
      res.send(err);
    }
  });

  console.log(lecturerName + " " + lecturerID+ " " + dept +" " );
  console.log("Form accepted");

});

app.post("/form",function(req,res){
console.log(req.body);

//Adding retrieved data to mongoDB database
  // const newTimeTable = new TimeTable({
  //
  // });
  //
  // newTimeTable.save(function(err){
  //   if(!err){
  //     res.sendFile(__dirname+"/success/successstimetable.html");
  //   }else{
  //     res.send(err);
  //   }
  // });
  // console.log("Form accepted");

});
app.post("/deletelecturer",function(req,res){
  teacherID=req.body.tid;


  Lecturer.findOneAndDelete({lid:teacherID},function(err){
    if(!err){
      console.log("Successfully deleted item");
      res.redirect("/lecturerdetails");
    }else{
      console.log(err);
    }

  })
  console.log(teacherID);

});
app.post("/deletesubject",function(req,res){
  subjectID=req.body.sid;

  Subject.findOneAndDelete({subcode:subjectID},function(err){
    if(!err){
      console.log("Successfully deleted item");
      res.redirect("/subjectdetails");
    }else{
      console.log(err);
    }
  })
  console.log(subjectID);
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

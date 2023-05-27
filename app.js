const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var Subject;
var Lecturer;
var TimeTable;

const app = express();
app.set('view engine', "ejs");
mongoose.set('strictQuery', false);

app.set('view engine', "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/timetableDB');

  //Defining timetableSchema to store the details
  const subjectSchema = new mongoose.Schema({
    subname: String,
    fname: String,
    subcode: String,
    classes: Number

  });
  const lectureSchema = new mongoose.Schema({
    lname: String,
    lid: String,
    ldept: String
  });
  const timetableSchema = new mongoose.Schema({
    dept: String,
    sem: Number,
    day: String,

    period1sname: String,
    period1lid: String,

    period2sname: String,
    period2lid: String,

    period3sname: String,
    period3lid: String,

    period4sname: String,
    period4lid: String,

    period5sname: String,
    period5lid: String,

    period6sname: String,
    period6lid: String,

    period7sname: String,
    period7lid: String,




  });
  Lecturer = mongoose.model("Lecturer", lectureSchema);
  Subject = mongoose.model("Subject", subjectSchema);
  TimeTable = mongoose.model("TimeTable", timetableSchema);
}

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.get("/admin", function(req, res) {
  res.sendFile(__dirname + "/admin-panel.html");
});
// app.get("/subjectdetails",function(req,res){
//   res.sendFile(__dirname+"/subject-details.html");
// });
app.get("/subjectdetailsform", function(req, res) {
  res.sendFile(__dirname + "/subject-details-form.html");
});
app.get("/subjectdetails", function(req, res) {
  Subject.find({}, function(err, foundData) {
    if (!err) {
      if (foundData) {
        res.render("subject-details", {
          subjectData: foundData
        });
      }
    } else {
      console.log(err);
    }
  });
});
app.get("/lecturerdetails", function(req, res) {
  Lecturer.find({}, function(err, foundData) {
    if (!err) {
      if (foundData) {
        res.render("lecturer-details", {
          teacherData: foundData
        });
      }
    } else {
      console.log(err);
    }

  });

});
app.get("/lecturerform", function(req, res) {
  res.sendFile(__dirname + "/lecturer-form.html");
})
app.get("/timetabledetails", function(req, res) {
  res.sendFile(__dirname + "/timetable-details.html")
});
app.get("/timetableform", function(req, res) {
  res.sendFile(__dirname + "/timetable-entry-form.html")
});
app.post("/subjectdetails", function(req, res) {
  const subjectName = req.body.subname;
  const facultyName = req.body.fname;
  const subjectCode = req.body.subcode;
  const classesPerWeek = req.body.classes;

  const newSubject = new Subject({
    subname: subjectName,
    fname: facultyName,
    subcode: subjectCode,
    classes: classesPerWeek
  });
  newSubject.save(function(err) {
    if (!err) {
      res.sendFile(__dirname + "/success/successsubject.html");
    } else {
      res.send(err);
    }
  });
  console.log(subjectName + " " + facultyName + " " + subjectCode + " " + classesPerWeek);
  console.log("Form accepted");

});
app.post("/lecturerform", function(req, res) {
  const lecturerName = req.body.fname;
  const lecturerID = req.body.fid;
  const dept = req.body.dept;

  // Lecturer.exists({lid:lecturerID},function(err,result){
  //   if(result===true){
  //     prompt("data already exists");
  //   }
  //   console.log(result);
  // });






  const newLecturer = new Lecturer({
    lname: lecturerName,
    lid: lecturerID,
    ldept: dept
  });
  newLecturer.save(function(err) {
    if (!err) {
      res.sendFile(__dirname + "/success/successlecture.html");
    } else {
      res.send(err);
    }
  });

  console.log(lecturerName + " " + lecturerID + " " + dept + " ");
  console.log("Form accepted");

});

app.post("/form",  function(req, res) {
  let bool = true;
  const deptname = req.body.dept;
  const semester = req.body.sem;
  const day = req.body.day;

  const p1subname = req.body.p1scode;
  const p1tname = req.body.p1tid;

  const p2subname = req.body.p2scode;
  const p2tname = req.body.p2tid;

  const p3subname = req.body.p3scode;
  const p3tname = req.body.p3tid;

  const p4subname = req.body.p4scode;
  const p4tname = req.body.p4tid;

  const p5subname = req.body.p5scode;
  const p5tname = req.body.p5tid;

  const p6subname = req.body.p6scode;
  const p6tname = req.body.p6tid;

  const p7subname = req.body.p7scode;
  const p7tname = req.body.p7tid;

  //Adding retrieved data to mongoDB database
  const newTimeTable = new TimeTable({
    dept: deptname,
    sem: semester,
    day: day,

    period1sname: p1subname,
    period1lid: p1tname,

    period2sname: p2subname,
    period2lid: p2tname,

    period3sname: p3subname,
    period3lid: p3tname,

    period4sname: p4subname,
    period4lid: p4tname,

    period5sname: p5subname,
    period5lid: p5tname,

    period6sname: p6subname,
    period6lid: p6tname,

    period7sname: p7subname,
    period7lid: p7tname,

  });



   TimeTable.find({}, (err, foundData) => {

    if (foundData) {
      foundData.forEach((item) => {

          if ((item.day === day) && (p1tname === item.period1lid || p2tname === item.period2lid || p3tname === item.period3lid || p4tname === item.period4lid || p5tname === item.period5lid || p6tname === item.period6lid || p7tname === item.period7lid)) {
            bool = false;
            console.log(bool);
            res.render("error", {
              message: "Oops! the entered data produces a clash,please check the data "
            });
            return;


          }

        }

      )

    }

  });

  setTimeout(function() {
    console.log(bool);
      if(!bool){
        return;
      }
      newTimeTable.save(function(err) {
        if (!err) {
          res.sendFile(__dirname + "/success/successtimetable.html");
        } else {
          res.send(err);
        }
      });
      console.log("Form accepted");
    }, 5000);





});
app.post("/deletelecturer", function(req, res) {
  teacherID = req.body.tid;


  Lecturer.findOneAndDelete({
    lid: teacherID
  }, function(err) {
    if (!err) {
      console.log("Successfully deleted item");
      res.redirect("/lecturerdetails");
    } else {
      console.log(err);
    }

  })
  console.log(teacherID);

});
app.post("/deletesubject", function(req, res) {
  subjectID = req.body.sid;
console.log(subjectID);
  Subject.findOneAndDelete({
    subcode: subjectID
  }, function(err) {
    if (!err) {
      console.log("Successfully deleted item");
      res.redirect("/subjectdetails");
    } else {
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

app.listen(3000, function() {
  console.log("Server running at port 3000");
});

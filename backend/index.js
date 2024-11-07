const express = require("express");
const app=express();
const port = 8080;
const fs = require('fs');
const path = require("path");
const mongoose = require('mongoose');
const multer = require('multer');

mongoose.connect('mongodb+srv://jayakrishna:jaya123@jayakrishna.skfvg.mongodb.net/EMS?retryWrites=true&w=majority&appName=Jayakrishna')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));
const Employee =  require('./Models/Employee.js')


app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.set("views",path.join(__dirname,"/views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.render('login.ejs')
})
app.get("/home",(req,res)=>{
    res.render("dash.ejs")
})
app.get("/addemployee",(req,res)=>{
    res.render('addemployee')
})
const uploadDirectory = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/addemployee', upload.single('imgUpload'), async (req, res) => {
  try {
    const imgPath = req.file ? req.file.path : null; 
    if (!imgPath) {
      return res.status(400).send("Image upload failed. Please try again.");
    }

    const newEmployee = new Employee({
      name: req.body.name,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      designation: req.body.designation,
      gender: req.body.gender,
      courses: req.body.courses,
      imgUpload: imgPath,
    });

    await newEmployee.save();
    res.redirect('/home');
  } catch (error) {
    console.error("Error saving employee:", error);
    res.status(500).send("Error adding employee. Please try again.");
  }
});
// app.get("/home",(req,res)=>{
//     res.send("home");
// })
// app.get("/ig/:username",(req,res)=>
// {
//     // let foll = ["jk","shit","kk"];
//     const instaData = require("./data.json");
//     let {username} = req.params;
//     let data = instaData[username];
//     if(data)
//     res.render("insta.ejs",{data});
//     else
//     res.render("error.ejs");
// })
// app.get("/rolldice",(req,res)=>{
//     let rnum = Math.floor(Math.random()*6)+1;
//     res.render("rolldice.ejs",{num:rnum});
// })
// let blogs = [
//     {
//         title:"Hello",
//         content:"    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero, natus eos quo praesentium illo placeat facere, voluptatem asperiores perspiciatis esse ipsam doloremque obcaecati repudiandae quidem tenetur animi facilis sapiente!"
//     },
//     {
//         title:"Hello",
//         content:"    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero, natus eos quo praesentium illo placeat facere, voluptatem asperiores perspiciatis esse ipsam doloremque obcaecati repudiandae quidem tenetur animi facilis sapiente!"
//     },
//     {
//         title:"Hello",
//         content:"    Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit libero, natus eos quo praesentium illo placeat facere, voluptatem asperiores perspiciatis esse ipsam doloremque obcaecati repudiandae quidem tenetur animi facilis sapiente!"
//     }
// ]
// app.get("/",(req,res)=>{
//     res.render("index",{blogs});
// })
// app.get("/create",(req,res)=>{
//     res.render("create",{blogs});
// })
app.listen(port,()=>
{
    console.log(`Listening on port : ${port}`);
})

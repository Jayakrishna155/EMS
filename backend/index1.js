const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Employee = require('./Models/Employee');
const multer = require('multer');
const session = require('express-session');
const app = express();
const UserSchema = new mongoose.Schema({
    f_sno: String,
    f_userName: String,
    f_Pwd: String,
});

const User = mongoose.model('User', UserSchema);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


mongoose.connect('mongodb+srv://jayakrishna:jaya123@jayakrishna.skfvg.mongodb.net/EMS?retryWrites=true&w=majority&appName=Jayakrishna')
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection error", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.static(path.join(__dirname,"/public/js")));
app.set("views",path.join(__dirname,"/views"));

app.set('view engine', 'ejs');

// Session handling
app.use(session({
    secret: 'your-secret-key',  // Change this to a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Routes
// Login route
app.get("/login",(req,res)=>{
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { f_sno, f_userName, f_Pwd } = req.body;
    const user = await User.findOne({ f_sno, f_userName, f_Pwd });

    if (user) {
        // Store user data in the session
        req.session.user = user;

        // Successful login: Redirect to home page (or dashboard)
        res.redirect('/');
    } else {
        // Failed login: Show alert and redirect to login page
        res.send('<script>alert("Invalid Credentials! Please try again.");window.location.href="/login";</script>');
    }
});

// Homepage route
app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('dash', { admin: req.session.user });
    } else {
        res.redirect('/login');
    }
});

// Fetch all employees and display them in EJS template
app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.render('employeelist', { employees });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Delete an employee
app.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Employee.findByIdAndDelete(id);
        res.redirect('/employees'); // Redirect to employee list page
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Edit an employee
app.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        res.render('editEmployee', { employee });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Update employee data
app.post('/edit/:id', upload.single('imgUpload'), async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        // Handle image update if a new file is uploaded
        if (req.file) {
            updatedData.imgUpload = req.file.filename;
        }

        await Employee.findByIdAndUpdate(id, updatedData, { new: true });
        res.redirect('/employees'); // Redirect to employee list page after update
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Add new employee form
app.get('/addemployee', (req, res) => {
    res.render('addemployee');
});

// Post data for new employee
app.post('/addemployee', upload.single('imgUpload'), async (req, res) => {
    try {
        const newEmployee = new Employee({
            name: req.body.name,
            email: req.body.email,
            mobileNo: req.body.mobileNo,
            designation: req.body.designation,
            gender: req.body.gender,
            courses: req.body.courses,
            imgUpload: req.file.filename
        });

        await newEmployee.save();
        res.redirect('/employees'); // Redirect to employee list page
    } catch (err) {
        res.status(500).send('Server Error');
    }
});
app.get('/profile', (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        // Ensure `courses` is an array
        user.courses = Array.isArray(user.courses) ? user.courses : [];
        res.render('profile', { user });
    } else {
        res.redirect('/login'); // If not logged in, redirect to login page
    }
});



// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

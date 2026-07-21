const mongoose = require("mongoose");
const express = require ("express"); //means to load the express library in my program
const app = express(); //means to create a new express application and store it in app
app.use(express.json());
//app = it is like backend server controller , whenever we want our backend to do something we ask 


mongoose.connect("mongodb://localhost:27017/studentDB")
.then(() => {
    console.log("mongodb connected");
})
.catch((err) => {
    console.log(err);
});


const studentSchema = new mongoose.Schema({
    name: String,
    cgpa: Number
});


const Student = mongoose.model(
    "Student",
    studentSchema
); //means mongoose create a student model using student schema


//routes
app.get("/" , (req , res) => {
    res.send("welcome to student management api ");
});

app.get("/about" , (req,res) => {
    res.send("this is about page");
});

app.post("/students" , async (req,res) => {
    const student = new Student(req.body);
    await student.save();
        res.send("student saved successfully");
});

app.get("/students" , async (req,res) => {
    const students = await Student.find();
    res.send(students);
});

app.get("/students/:id" , async (req , res) => {
    // console.log(req.params);
    const student = await Student.findById(req.params.id);
    res.send(student);
    // res.send("received id");
});

app.put("/students/:id" , async (req , res) => {
    await Student.findByIdAndUpdate(
        req.params.id,
        req.body
    );
    res.send("Student Updated Successfully")
});

app.delete("/students/:id" , async(req , res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send("Student Deleted Successfully");
});

app.listen(3000 , () => {
    console.log("server running on port 3000");
});
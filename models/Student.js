const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String,
    cgpa: Number
});

const Student = mongoose.model("Student" , studentSchema);

module.exports = Student;

//in server.js we will then write
//const Student = require("./models/Student");
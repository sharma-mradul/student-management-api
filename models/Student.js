const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // name: String,
    // cgpa: Number

    name: {
        type: String,
        required: true
    },
    cgpa: {
        type: Number ,
        required: true,
        min: 0,
        max: 10
    }
});

const Student = mongoose.model("Student" , studentSchema);

module.exports = Student;

//in server.js we will then write
//const Student = require("./models/Student");
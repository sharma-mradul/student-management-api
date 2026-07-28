const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    // name: String,
    // cgpa: Number

    name: {
        // type: String,
        // required: true

        type:String,
        required:[true , "Name is required"],
        minlength:[3 , "Minimum 3 characters"],
        maxlength:[30 , "Maximum 30 characters"]
    },
    cgpa: {
    //     type: Number ,
    //     required: true,
    //     min: 0,
    //     max: 10
    // }
    type: Number, 
    required:[true , "CGPA is required"],
    min:[0 , "CGPA cannot be below 0"],
    max:[10 , "CGPA cannot exceed 10"]
    }
});

const Student = mongoose.model("Student" , studentSchema);

module.exports = Student;

//in server.js we will then write
//const Student = require("./models/Student");
const Student = require("../models/Student");

//CREATE
const createStudent = async (req , res) => {
    try{
    const student = new Student(req.body);
    await student.save();
    // res.send("student saved successfully");
    res.status(201).json({
        message: "Student Saved Successfully"
    });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }

};

//READ ALL
const getStudent = async (req , res) => {
    const students = await Student.find();
    // res.send(students);
    res.status(200).json(students);
}

//READ ONE
const getStudentById = async (req , res) => {
    const student = await Student.findById(req.params.id);
    // res.send(student);
    res.status(200).json(students);
}

//UPDATE
const updateStudent = async (req , res) => {
    await Student.findByIdAndDelete(req.params.id);
    // res.send("student updated successfully")
    res.status(200).json({
        message: "Student Updated Successfully"
    });
}

//DELETE
const deleteStudent = async (req , res) => {
    await Student.findByIdAndDelete(req.params.id);
    // res.send("Student deleted successfully");
    res.status(200).json({
        message: "Student Deleted Successfully"
    });
}
module.exports = { createStudent , getStudent , getStudentById , updateStudent , deleteStudent};
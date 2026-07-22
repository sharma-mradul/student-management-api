const Student = require("../models/Student");

//CREATE
const createStudent = async (req , res) => {
    const student = new Student(req.body);
    await student.save();
    res.send("student saved successfully");
};

//READ ALL
const getStudent = async (req , res) => {
    const students = await Student.find();
    res.send(students);
}

//READ ONE
const getStudentById = async (req , res) => {
    const student = await Student.findById(req.params.id);
    res.send(student);
}

//UPDATE
const updateStudent = async (req , res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send("student updated successfully")
}

//DELETE
const deleteStudent = async (req , res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.send("Student deleted successfully");
}
module.exports = { createStudent , getStudent , getStudentById , updateStudent , deleteStudent};
const Student = require("../models/Student");
const studentService = require("../services/studentService");

//CREATE
const createStudent = async (req , res , next) => {
    try{
    // const student = new Student(req.body);
    // await student.save();
    const student = await studentService.createStudent(req.body);
    // res.send("student saved successfully");
    res.status(201).json({
        message: "Student Saved Successfully"
    });
    }
    catch(err){
        // console.log(err);
        // res.status(500).json({
        //     success: false,
        //     message: "Internal Server Error"
        // });
        next(err);
    }

};

//READ ALL
// const getStudent = async (req , res) => {
//     // const students = await Student.find();

//     const cgpa = req.query.cgpa;
//     let students;
//     if(cgpa) {
//         students = await Student.find({cgpa : cgpa});
//     }
//     else{
//         students = await Student.find();
//     }
//     // res.send(students);
//     res.status(200).json(students);
// }


// const getStudents = async (req , res , next) => {
//     try{
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 5;
//         const skip = (page - 1) * limit;
//         const students = await Student.find()
//         .skip(skip)
//         .limit(limit);
//         res.status(200).json(students);
//     }
//     catch(err){
//         next(err);
//     }
// };
//combining pagination with req.query.cgpa
const getStudent = async (req , res , next) => {
    try{
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const skip = (page - 1)*limit;

        //creating filter
        const filter = {};

        //creating sorting
        let sort = {};
        
        if(req.query.sort){
            const field = req.query.sort;

            if(field.startsWith("-")){
                sort[field.substring(1)] = -1;
            }
            else{
                sort[field] = 1;
            }
        }

        if(req.query.cgpa){
            filter.cgpa = Number(req.query.cgpa);
        }
        // const students = await Student.find(filter)
        // .sort(sort)
        // .skip(skip)
        // .limit(limit);

        const students = await studentService.getStudents(
            filter,
            sort,
            skip,
            limit
        );
        res.status(200).json(students);
    }
    catch(err){
        next(err);
    }
};


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
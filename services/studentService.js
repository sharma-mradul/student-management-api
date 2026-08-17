const Student = require("../models/Student");
const getStudents = async(filter , sort , skip , limit) => {
    return await
    Student.find(filter).sort(sort).skip(skip).limit(limit);
};

const createStudent = async (data) =>{
    const student = new Student(data);
    return await student.save();
};
module.exports = {getStudents , createStudent};
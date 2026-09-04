const Student = require("../models/Student");
const getStudents = async(filter , sort , skip , limit) => {
    return await
    Student.find(filter).sort(sort).skip(skip).limit(limit);
};

const createStudent = async(data) =>{
    const student = new Student(data);
    return await student.save();
}

const getStudentStats = async () => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: null,
                totalStudents: { $sum: 1 },
                averageCgpa: { $avg: "$cgpa"},
                highestCgpa: { $max: "$cgpa"},
                lowestCgpa: { $min: "$cgpa"},
                studentsAbove9: {
                    $sum: {
                        $cond: [
                            { $gte: ["$cgpa" ,9]},
                            1,
                            0
                        ]
                    }
                },
                studentBelow9: {
                    $sum: {
                        $cond: [
                            { $lt: ["$cgpa" , 9]},
                            1,
                            0
                        ]
                    }
                }
            }
        }
    ]);
    return result[0];
}


const getDepartmentStats = async () => {
    const result = await Student.aggregate([
        {
            $group: {
                _id: "$department",
                totalStudents: { $sum: 1},
                averageCgpa: { $avg: "$cgpa"}
            }
        }
    ]);
    return result;
}

module.exports = {getStudents , createStudent , getStudentStats , getDepartmentStats};
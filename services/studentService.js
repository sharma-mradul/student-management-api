const Student = require("../models/Student");
const { redisClient } = require("../config/redis");
const getStudents = async(filter , sort , skip , limit) => {

    const cacheKey = `students:${JSON.stringify({
        filter,
        sort,
        skip,
        limit
    })}`;
    const cachedStudents = await redisClient.get(cacheKey);

    if(cachedStudents)
    {
        console.log("Redis Cache HIT");
        return JSON.parse(cachedStudents);
    }
    console.log("Redis Cache MISS");

    const students = await Student.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

    await redisClient.set(cacheKey,
        JSON.stringify(students),
        {
            EX: 60
        }
    );
    return students;
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
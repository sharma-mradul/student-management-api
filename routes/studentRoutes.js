const express = require("express");

const router = express.Router();

const{
    createStudent , getStudent , getStudentById , updateStudent , deleteStudent
} = require("../controllers/studentController");

router.post("/" , createStudent);
router.get("/" , getStudent);
router.get("/:id" , getStudentById);
router.put("/:id" , updateStudent);
router.delete("/:id" , deleteStudent);

module.exports = router;


//router - a mini express app , receive routes and forward them
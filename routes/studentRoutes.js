const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authorize = require("../middlewares/roleMiddleware");

const router = express.Router();

const{
    createStudent , getStudent , getStudentById , updateStudent , deleteStudent
} = require("../controllers/studentController");

router.post("/" , createStudent);
router.get("/" , authMiddleware , getStudent);
router.get("/:id" , getStudentById);
router.put("/:id" , updateStudent);
// router.delete("/:id" , deleteStudent);

router.delete("/:id", authMiddleware , authorize("admin") , deleteStudent);

module.exports = router;


//router - a mini express app , receive routes and forward them
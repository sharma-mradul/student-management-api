const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req , res , next) => {
    try{
        const { name , email , password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10); //10 is bcrypt cost factor

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            success: true,
            message: "user regester successfully"
        });
    }
    catch(err) {
        next(err);
    }
};


const login = async (req , res , next) => {
    try{
        const {email , password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "invalid email or password" //deliberately saying
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );
        //Password hashes aren't decrypted during login. They are compared.

        if(!isPasswordCorrect){

            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            });
        }

            const token = jwt.sign( //create a jwt
                { userId: user._id },
                "MY SECRET KEY",
                { expiresIn: "1h" }
            );

            res.status(200).json({
                success: true,
                message: "login successfully",
                token: token
            });
        }
    catch(err){
        next(err);
    };
}

module.exports = { register , login };
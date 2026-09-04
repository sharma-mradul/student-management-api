const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");

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

            const accessToken = jwt.sign( //create a jwt
                { userId: user._id , role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );
            const refreshToken = jwt.sign(
                {userId: user._id , role: user.role},
                process.env.JWT_REFRESH_SECRET,
                {expiresIn: "7d"}
            );

            res.cookie("refreshToken" , refreshToken , {
                httpOnly: true
            });

            res.status(200).json({
                success: true,
                message: "login successfully",
                accessToken
            });
        }
    catch(err){
        next(err);
    };
}

const refreshAccessToken = async (req, res, next) => {

    try {

        const { refreshToken } = req.cookies;

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const accessToken = jwt.sign(
            {
                userId: decoded.userId,
                role: decoded.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15m"
            }
        );

        res.status(200).json({
            success: true,
            accessToken
        });

    }
    catch (err) {

        return res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token"
        });

    }

};

const expiresAt = new Date(
    Date.now() + 7 * 24 * 60 * 60 * 1000
);
const refreshTokenDoc = new RefreshToken({
    userId: user._id,
    token: refreshToken,
    expiresAt
});
await refreshTokenDoc.save();
module.exports = { register , login , refreshAccessToken};
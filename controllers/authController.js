const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken");
const crypto = require("crypto"); //built in node.js module

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
            const expiresAt = new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            );

            const familyId = crypto.randomUUID(); //UUID = universally unique identifier

            const refreshTokenDoc = new RefreshToken({
                userId: user._id,
                token: refreshToken,
                familyId,
                expiresAt
            });
            
            await refreshTokenDoc.save();

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
        console.log("REFRESH TOKEN:" , req.cookies.refreshToken);

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );

        const storedToken = await RefreshToken.findOne({
            token: refreshToken
        });

        if(!storedToken)
        {
            return res.status(401).json({
                success: false,
                message: "Refresh token revoked"
            });
        }

        if(storedToken.status !== "active")
        {
            await RefreshToken.updateMany(
                { familyId: storedToken.familyId },
                { $set: { status: "revoked" }}
            );
            return res.status(401).json({
                success: false,
                message: "Refresh token reuse detected"
            });
        }

        const remainingTime = storedToken.expiresAt.getTime() - Date.now();
        const remainingSeconds = Math.floor(remainingTime / 1000);
        //1000 milliseconds = 1 second

        // await RefreshToken.deleteOne({
        //     token: refreshToken
        // }) 

        storedToken.status = "used"
        await storedToken.save();

        const newRefreshToken = jwt.sign(
            {
                userId: decoded.userId,
                role: decoded.role
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: remainingSeconds
            }
        )

        const newRefreshTokenDoc = new RefreshToken({
                userId: decoded.userId,
                token: newRefreshToken,
                familyId: storedToken.familyId,
                status: "active",
                expiresAt: storedToken.expiresAt
        });

        await newRefreshTokenDoc.save();

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true
        });


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

const logout = async (req , res , next) => {
    try{
        const { refreshToken } = req.cookies;

        await RefreshToken.deleteOne({
            token: refreshToken
        });

        res.clearCookie("refreshToken");

        return res.status(200).json({
            success: true,
            message: "Logout Successful"
        });
    }
    catch (err) {
        next(err);
    }
};



module.exports = { register , login , refreshAccessToken , logout};
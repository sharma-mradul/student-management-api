const errorHandler = (err , req , res , next) => {
    console.log(err);
    res.status(500).json({
        success:false,
        message:err.message
    });
};
module.exports = errorHandler;

//if a middleware has 4 paramaters it leads to error middleware

const authorize = (...allowedRoles) => {
    return (req , res , next) => {
        if(!allowedRoles.includes(req.user.role)){ //is the user role inside allowed roles?
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }
        next();
    };
};
module.exports = authorize;
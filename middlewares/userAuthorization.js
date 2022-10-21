const userAuthorizationHandler = (...role) => {
    return (req, res, next) => {
        const userRole = req.user[0].role;

        if (!role.includes(userRole)) {
            return res.status(403).json({
                status: "failed",
                message: "User is not authorized to this",
            });
        }
        next();
    };
};

module.exports = userAuthorizationHandler;

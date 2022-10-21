const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");

const userAuthMiddleware = async (req, res, next) => {
    let token; // to store token

    // extract jwt token that send from frontend
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            token = authorization.split(" ")[1];

            // verify() এটা userId return করে
            // NOTE: JWT তৈরি করার সময় first_Payload(string) যেই নামে দেওয়া হয়েছে সেইটাই verify return করবে (এখানেঃ ID)
            const { email } = jwt.verify(token, process.env.JWT_SECRET);

            // Get userId from token-part (password বাদে)
            req.user = await UserModel.find({ email }).select("-password");
            next();
        } catch (error) {
            console.log(error);
            res.status(401).send({
                status: "falied",
                message: "Unauthorized user",
            });
        }
    } else {
        res.send({ status: "failed", message: "unauthorized user" });
    }
};

module.exports = userAuthMiddleware;

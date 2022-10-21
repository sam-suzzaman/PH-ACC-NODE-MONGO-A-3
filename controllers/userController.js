const UserModel = require("./../model/UserModel");
const bcrypt = require("bcrypt");
const JWTGenerator = require("../utilities/JWT_Generator");

// user Signup/Registration Controller
const postNewUser = async (req, res) => {
    const userInfo = req.body;
    try {
        const user = await UserModel.create(userInfo);
        res.status(201).json({
            status: "success",
            message: "User created successfully",
        });
    } catch (error) {
        console.log(`register/signup error is: ${error}`);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

// user login handler
const userLoginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            // checking user identity: exist or not
            const isUserExist = await UserModel.findOne({ email: email });
            if (isUserExist) {
                // checking password
                const isMatched = await bcrypt.compare(
                    password,
                    isUserExist.password
                );
                if (email === isUserExist.email && isMatched) {
                    // JWT Token(string,expireTime)
                    const token_payload = {
                        email: isUserExist.email,
                        role: isUserExist.role,
                    };
                    const jwt_token = JWTGenerator(token_payload, "1d");
                    res.send({
                        status: "success",
                        message: "login successfully",
                        token: jwt_token,
                    });
                } else {
                    res.send({
                        status: "failed",
                        message: "Email or Password is not valid",
                    });
                }
            } else {
                res.send({
                    status: "failed",
                    message: "email is not found",
                });
            }
        }
    } catch (error) {
        console.log(error.message);
        res.send({ status: "failed", message: "something went wrong" });
    }
};

module.exports = { postNewUser, userLoginHandler };

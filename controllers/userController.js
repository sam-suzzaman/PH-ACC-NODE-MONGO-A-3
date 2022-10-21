const UserModel = require("./../model/UserModel");

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
        console.log(`all tour getting error is: ${error}`);
        res.status(400).json({
            status: "failed",
            message: error.message,
        });
    }
};

module.exports = { postNewUser };

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            validate: [validator.isEmail, "Enter a valid Email"],
            trim: true,
            // lowercae: true,
            unique: true,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            trim: true,
            // lowercae: true,
            unique: true,
            required: [true, "Password is required"],
            // validate: {
            //     validator: (value) =>
            //         validator.isStrongPassword(value, {
            //             minLenght: 6,
            //             minLowercase: 3,
            //             minNumbers: 1,
            //             minUppercase: 1,
            //             minSymbols: 1,
            //         }),
            //     message: "Password {VALUE} is not strong enough",
            // },
        },
        confirmPassword: {
            type: String,
            required: [true, "Confirm your password"],
            validate: {
                validator: function (value) {
                    return value === this.password;
                },
                message: "Password not match!",
            },
        },
        role: {
            type: String,
            enum: ["buyer", "store-manager", "admin"],
            default: "buyer",
        },
        firstName: {
            type: String,
            required: [true, "Provide a first name"],
            trim: true,
            minLenght: [3, "Name is two short"],
            maxLength: [100, "Name is too long"],
        },
        lastName: {
            type: String,
            required: [true, "Provide a first name"],
            trim: true,
            minLenght: [3, "Name is two short"],
            maxLength: [100, "Name is too long"],
        },
    },
    {
        timestamps: true,
    }
);

// To Hashed Password
UserSchema.pre("save", async function (next) {
    const password = this.password; // accessing password

    const salt = await bcrypt.genSalt(16); //generating salt
    const hashedPassword = bcrypt.hashSync(password, salt);

    this.password = hashedPassword; // reasign hashed password
    this.confirmPassword = undefined; // no need to save confirm password on DB

    next();
});
const UserModel = mongoose.model("User", UserSchema);
module.exports = UserModel;

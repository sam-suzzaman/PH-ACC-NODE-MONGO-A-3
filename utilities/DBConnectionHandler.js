require("dotenv").config();
const mongoose = require("mongoose");

function DBConnectionHandler() {
    mongoose
        .connect(process.env.DB_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("db connected successfully");
        })
        .catch((err) => {
            console.log(`There is an error id DB: ${err.message}`);
        });
}

module.exports = DBConnectionHandler;

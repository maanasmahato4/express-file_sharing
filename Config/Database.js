const mongoose = require("mongoose");

const ConnectDB = () => {
    mongoose.connect("mongodb+srv://maanas:maanas@cluster0.wlczq2q.mongodb.net/?retryWrites=true&w=majority")
        .then(() => console.log("database connected!"))
        .catch(err => console.log("db connection failed error:", err))
}

module.exports = { ConnectDB };
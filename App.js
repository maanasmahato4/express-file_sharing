require('dotenv').config();
const express = require("express");
const { ConnectDB } = require("./Config/Database");

const app = express();
ConnectDB();
app.use(express.json());
app.use("/api/files", require("./Routes/files"));


app.listen(3000, () => {
    console.log(`server running at http://localhost:${3000}`);
})
const express = require("express");
const cors = require("cors");
const { readdirSync } = require("fs");
const mongoose = require("mongoose");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const { log } = require("console");
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(fileupload({ useTempFiles: true }));

// Router
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

// Database
mongoose
  .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("DataBase connection successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with account credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening .....");
});

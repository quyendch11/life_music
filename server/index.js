const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { ExpressPeerServer } = require("peer");
const http = require("http");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

ExpressPeerServer(http, { path: "/" });
const URI = process.env.MONGODB_URL;
mongoose.connect(URI).then(() => {
  console.log("DB Connected");
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});

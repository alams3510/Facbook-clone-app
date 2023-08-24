const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
app.use(cors());

dotenv.config();
//connection with mongoDB Atlas
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.get("/api", (req, res) => {
  res.status(200).send("hello world");
});

//uploading an image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded");
  } catch (error) {
    console.log(error);
  }
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Backend server is running! on port number " + port);
});

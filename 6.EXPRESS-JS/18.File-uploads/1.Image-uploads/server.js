// Import necessary modules
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const PORT = 3000;
const app = express();
//EJS template engine
app.set("view engine", "ejs");
//server the public
app.use(express.static("public"));
//Connect to mongodb
mongoose
  .connect("mongodb+srv:")
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));
//Image schema
const imageSchema = new mongoose.Schema(
  {
    url: String,
    public_id: String,
  },
  {
    timestamps: true,
  }
);
//Model
const Image = mongoose.model("Image", imageSchema);
// Configure Cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images",
    format: async (req, file) => "png", // Force PNG format
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [{ width: 800, height: 600, crop: "fill" }],
  },
});

// Configure multer
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Please upload an image."), false);
    }
  },
});

//Welcome route
app.get("/", (req, res) => {
  res.render("welcome");
});

// route for displaying upload form
app.get("/upload-form", (req, res) => {
  res.render("upload");
});

//Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const uploaded = await Image.create({
    url: req.file.path,
    public_id: req.file.filename,
  });
  //redirect
  res.redirect("/images");
});

//get all images
app.get("/images", async (req, res) => {
  try {
    const files = await Image.find();
    res.render("images", { files });
  } catch (error) {
    res.json(error);
  }
});
// Upload route with enhanced logging
// app.post("/upload", (req, res, next) => {
//   upload.single("file")(req, res, (err) => {
//     // Handle errors thrown by multer
//     if (err instanceof multer.MulterError) {
//       console.error("Multer error: ", err.message); // Log multer errors
//       return res.status(400).json({ error: "Multer error: " + err.message });
//     } else if (err) {
//       console.error("Unexpected error: ", err); // Log unexpected errors
//       return res.status(400).json({ error: "Upload error: " + err.message });
//     }

//     // If no file was uploaded, throw an error
//     if (!req.file) {
//       console.error("No file uploaded.");
//       return res.status(400).json({ error: "No file uploaded." });
//     }

//     // Log successful file upload details
//     console.log(
//       "File uploaded successfully: ",
//       JSON.stringify(req.file, null, 2)
//     );

//     // Respond with file details
//     res.json({
//       message: "File uploaded successfully",
//       fileDetails: req.file,
//       url: req.file.path, // Cloudinary URL
//     });
//   });
// });

// Global error handler for catching unhandled errors
app.use((err, req, res, next) => {
  console.error("Unhandled error: ", err.stack); // Log full error stack
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

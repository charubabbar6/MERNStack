require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs").promises; // Require the fs module

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from public directory
app.use(express.static(__dirname + "/public"));

// Route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Route to handle form submissions
app.post("/text", upload.single("image"), async (req, res) => {
  const prompt = req.body.prompt; // Get the text prompt
  const image = req.file; // Get the uploaded image

  // Debugging: Check if the image file is uploaded
  console.log("Uploaded file:", image);
  console.log("Prompt:", prompt);

  let content = [];

  // Check if prompt is provided
  if (prompt) {
    content.push({ text: prompt });
  }

  // Check if an image is uploaded
  if (image) {
    // Read the image file from disk
    try {
      const imageData = await fs.readFile(image.path); // Read the image file
      const imageBase64 = imageData.toString("base64"); // Convert image buffer to Base64

      content.push({
        inlineData: {
          mimeType: image.mimetype,
          data: imageBase64,
        },
      });
    } catch (err) {
      console.error("Error reading image file:", err);
      return res.status(500).json({ error: "Failed to read image file" });
    }
  } else {
    console.warn("No image uploaded");
  }

  // Ensure that content is not empty
  if (content.length === 0) {
    return res.status(400).json({ error: "No prompt or image provided." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(content);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate text" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

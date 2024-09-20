//npm install @google/generative-ai
//Loads environment variables from a .env file.
require("dotenv").config();
//Framework for building the server.
const express = require("express");
//Middleware for handling file uploads.
const multer = require("multer");
//Library for generating PDF documents.
const PDFDocument = require("pdfkit");
//File system modules for reading/writing files.
const fs = require("fs");
const fsPromises = fs.promises;
//Utility for handling file and directory paths.
const path = require("path");
// Library for interacting with Google’s Generative AI models.
const { GoogleGenerativeAI } = require("@google/generative-ai");
//Express App Setup
const app = express();
const port = process.env.PORT || 3000;

//configure multer
// Set up Multer to store files in the 'upload' directory
const upload = multer({ dest: "upload/" });
// Set the JSON body size limit to 10MB
app.use(express.json({ limit: "10mb" }));

//initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
//Serves static files from the public directory.
app.use(express.static("public"));

// Route to analyze uploaded image
//Accepts an uploaded image file under the field name image.
app.post("/analyze", upload.single("image"), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }
    // Path to the uploaded image
    // Read the image file as base64 data
    const imagePath = req.file.path;
    const imageData = await fsPromises.readFile(imagePath, {
      encoding: "base64",
    });
    // Prepare the model for analysis
    // Use the Gemini model to analyze the image
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    //A prompt is defined for the Google Generative AI model, asking it to analyze the plant in the image.
    let prompt = req.body.customPrompt;
    // "Analyze this plant image and provide detailed analysis of its species, health, and care recommendations, its characteristics, care instructions, and any interesting facts. Please provide the response in plain text without using any markdown formatting.";
    if (Array.isArray(prompt)) {
      prompt = prompt[0]; // Get the first string from the array
    }
    console.log("prompt:::::::::", prompt);

    // Extract the custom prompt from the request body
    //const customPrompt = req.body.customPrompt || "Describe about this image";

    // Generate content using the AI model
    //The model generates a detailed analysis based on the image data.
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: imageData,
        },
      },
    ]);
    const plantInfo = result.response.text(); // Get the generated analysis text
    // Clean up: delete the uploaded file to free up space
    await fsPromises.unlink(imagePath);

    // Respond with the analysis result and the image data in base64 format
    res.json({
      result: plantInfo,
      image: `data:${req.file.mimetype};base64,${imageData}`,
    });
  } catch (error) {
    console.error("Error analyzing image:", error);
    res
      .status(500)
      .json({ error: "An error occurred while analyzing the image" });
  }
});

// Route to download PDF report
app.post("/download", express.json(), async (req, res) => {
  const { result, image } = req.body; // Extract result and image data from request body
  try {
    //Ensure the reports directory exists
    const reportsDir = path.join(__dirname, "reports");
    await fsPromises.mkdir(reportsDir, { recursive: true });
    // Generate a unique filename for the PDF
    const filename = `plant_analysis_report_${Date.now()}.pdf`;
    const filePath = path.join(reportsDir, filename);
    const writeStream = fs.createWriteStream(filePath); // Create a write stream for the PDF
    const doc = new PDFDocument(); // Create a new PDF document
    doc.pipe(writeStream); // Pipe the document to the write stream
    // Add content to the PDF
    doc.fontSize(24).text("Plant Analysis Report", {
      align: "center",
    });
    doc.moveDown();
    doc.fontSize(24).text(`Date: ${new Date().toLocaleDateString()}`);
    doc.moveDown();
    doc.fontSize(14).text(result, { align: "left" });
    // Insert image into the PDF if provided
    if (image) {
      const base64Data = image.replace(/^data:image\/\w+;base64,/, ""); // Remove base64 prefix
      const buffer = Buffer.from(base64Data, "base64"); // Convert base64 string to buffer
      doc.moveDown();
      doc.image(buffer, {
        fit: [500, 300], // Fit image to specified dimensions
        align: "center",
        valign: "center",
      });
    }
    doc.end(); // Finalize the PDF document
    //wait for the pdf to be created
    await new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    // Send the generated PDF as a download
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ error: "Error downloading the PDF report" });
      }
      // Clean up: delete the PDF file after sending
      fsPromises.unlink(filePath);
    });
  } catch (error) {
    console.error("Error generating PDF report:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the PDF report" });
  }
});
//start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

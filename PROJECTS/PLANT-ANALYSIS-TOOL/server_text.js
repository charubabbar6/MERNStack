require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

console.log(genAI);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle form submissions
app.post("/submit-form", (req, res) => {
  const formData = req.body;

  res.json(formData);
});

app.post("/text", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
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

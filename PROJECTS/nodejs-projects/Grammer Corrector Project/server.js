//https://languagetool.org/http-api/?ref=public_apis
const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing form data
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 3000;
const GRAMMAR_API_URL = "https://api.languagetool.org/v2/check"; // Example URL

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/correct", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const response = await axios.post(
      GRAMMAR_API_URL,
      `text=${encodeURIComponent(text)}&language=en-US`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const matches = response.data.matches;
    let correctedText = text;

    // Apply corrections based on the suggestions
    matches.forEach((match) => {
      if (match.replacements.length > 0) {
        const replacement = match.replacements[0].value;
        correctedText =
          correctedText.slice(0, match.offset) +
          replacement +
          correctedText.slice(match.offset + match.length);
      }
    });

    res.render("result", {
      originalText: text,
      correctedText: correctedText,
      data: response.data,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while correcting the grammar" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

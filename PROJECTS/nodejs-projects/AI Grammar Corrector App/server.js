import "dotenv/config";
import express from "express";
import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Main route - render the form and display results
app.get("/", (req, res) => {
  res.render("index", {
    corrected: "",
    originalText: "",
  });
});
// app.get("/test", async (req, res) => {
//     try {
//       const response = await fetch("https://api.openai.com/v1/chat/completions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.OPENAI_KEY}`,
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [{ role: "user", content: "Hello, OpenAI!" }],
//           max_tokens: 50,
//         }),
//       });

//       const data = await response.json();
//       console.log("API Response:", data);

//       return res.send(data);
//     } catch (error) {
//       console.error("Test error:", error);
//       res.send("Error occurred. Check console logs.");
//     }
//   });

// Main logic route for handling text correction
app.post("/correct", async (req, res) => {
  const text = req.body.text.trim();

  if (!text) {
    // Render an error message if no text is provided
    return res.render("index", {
      corrected: "Please enter some text to correct",
      originalText: text,
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant" },
          { role: "user", content: `Correct the following text: ${text}` },
        ],
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 1,
      }),
    });

    if (!response.ok) {
      // Render an error message if the API response is not OK
      return res.render("index", {
        corrected: "Error. Please try again.",
        originalText: text,
      });
    }

    const data = await response.json();
    const correctedText = data.choices[0].message.content;

    // Render the corrected text
    return res.render("index", {
      corrected: correctedText,
      originalText: text,
    });
  } catch (error) {
    // Catch and handle any errors
    return res.render("index", {
      corrected: "Error. Please try again.",
      originalText: text,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

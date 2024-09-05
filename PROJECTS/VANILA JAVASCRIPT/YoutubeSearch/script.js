const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "7e11634cbdmsh63cec3931703155p13d81fjsn1bb3cb0cb284",
    "x-rapidapi-host": "youtube-search-results.p.rapidapi.com",
  },
};

// Select the input and button elements
const userInput = document.querySelector("#searchInput");
const btn = document.querySelector("#fetchBtn");

// Function to call the API and fetch results
const callParams = () => {
  const query = userInput.value.trim(); // Get user input and trim whitespace
  if (!query) return; // If input is empty, do nothing

  fetch(
    `https://youtube-search-results.p.rapidapi.com/youtube-search/?q=${query}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the data to understand its structure
      console.log("Items:", data.videos); // Log items property
      // Example: Adjusting based on potential response structure
      const items = data.videos || data.results || []; // Adjust according to actual response structure

      if (Array.isArray(items) && items.length > 0) {
        let output = "";
        items.forEach((video) => {
          output += `
                <div class="product">
                  <h2>${video.title}</h2>
                  <a href="${video.link}" target="_blank">
                    <img src="${video.thumbnail}" alt="${video.title}" />
                  </a>
                  <p>Views: ${video.views}</p>
                  <p>Published: ${video.uploaded}</p>
                </div>
              `;
        });
        document.querySelector("#result").innerHTML = output;
      } else {
        document.querySelector("#result").innerHTML =
          "<p>No videos found or unexpected response format.</p>";
      }
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      document.querySelector("#result").innerHTML =
        "<p>Error fetching data. Please try again.</p>";
    });

  userInput.value = ""; // Clear the input field after search
};

// Add event listener to the button to trigger API call
btn.addEventListener("click", callParams);

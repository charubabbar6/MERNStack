const form = document.getElementById("form");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = document.getElementById("prompt").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("prompt", prompt);
  formData.append("image", image);

  try {
    const response = await fetch("/text", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    resultDiv.innerHTML = `<p>${data.text}</p>`;
  } catch (error) {
    console.error(error);
    resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});

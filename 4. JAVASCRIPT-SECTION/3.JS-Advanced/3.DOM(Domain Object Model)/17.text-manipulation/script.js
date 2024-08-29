//Using textContent to update the blog title
const blogTitleEl = document.getElementById("title");
console.log(blogTitleEl);
blogTitleEl.textContent = "New Blog Title";
//change the background
blogTitleEl.style.background = "blue";
blogTitleEl.style.color = "white";
//Using innerHTML to add another paragraph with some HTML content
const paragraphEl = document.getElementById("paragraph");
paragraphEl.innerHTML = "<h1>I have changed the paragraph</h1>";

paragraphEl.innerHTML +=
  "<br> <strong>This is a new paragraph text with strong formatting</strong>";
console.log(paragraphEl);
// Using innerText to modify the comment section (assume the original comment is visible)

const firstCommentEl = document
  .getElementById("comment1")
  .querySelector(".commentText");
console.log(firstCommentEl);
firstCommentEl.innerText = "Updated first comment. This important!";

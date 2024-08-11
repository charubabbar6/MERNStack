//Selecting all elements with the class name "fiction"

const fictionBooksEl = document.getElementsByClassName("fiction");
//console.log(fictionBooksEl);
//Selecting all elements with the class name "non-fiction" within the nonFiction Section
const nonFictionEl = document.getElementById("nonFictionSection");
//console.log(nonFictionEl);

const nonFictionBooksInSectionEl =
  nonFictionEl.getElementsByClassName("non-fiction");
//console.log(nonFictionBooksInSectionEl);
//console.log(nonFictionBooksInSectionEl[1]);
//Loop throught the HTMLCollection

//First convert into an array
const fictionBooksElArr = Array.from(fictionBooksEl);
const fictionBooksElTitle = fictionBooksElArr.map((el) => el.innerHTML);

console.log(fictionBooksElTitle);

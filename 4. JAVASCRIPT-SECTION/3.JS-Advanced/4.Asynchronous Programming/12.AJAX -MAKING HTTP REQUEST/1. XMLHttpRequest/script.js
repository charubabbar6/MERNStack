const url = "https://jsonplaceholder.typicode.com/posts";

//create a new instance of XMLHttpRequest
const xhr = new XMLHttpRequest();

//configure the request
xhr.open("GET", url, true); //get,put,delete,patch,post

//Attach an event listener to handle changes in the request  state
xhr.onreadystatechange = function () {
  //Check if the request is complete (readyState 4) and successful (status 200)
  if (xhr.readyState === 4 && xhr.status === 200) {
    //parse the json data
    //console.log(xhr.responseText);
    console.log(JSON.parse(xhr.responseText));
  }
  //Handle errors
  if (xhr.readyState === 4 && xhr.status !== 200) {
    console.log(xhr.statusText);
  }
};

//send the request
xhr.send();

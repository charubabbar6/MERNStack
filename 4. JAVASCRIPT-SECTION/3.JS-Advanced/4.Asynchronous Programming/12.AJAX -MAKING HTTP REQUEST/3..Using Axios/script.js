const url = "https://jsonplaceholder.typicode.com/posts";

//axios using promise based

const fetchData = () => {
  axios
    .get(url) //post,delete,patch,put
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

//fetchData();

//Using async await

const fetchData2 = async () => {
  try {
    const result = await axios.get(url);
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
};

fetchData2().then((res) => {
  console.log(res);
});

//Simulating a Delay

//creating
async function waitAndRun(value) {
  //making API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, 3000);
  });
}

//const waitAndRun = async () => {};

//usage:

const getProcessedValue = async () => {
  const result = await waitAndRun("This is my Promise Result");
  console.log(result);
};

getProcessedValue();

// Fetching Multiple Values in Parallel

const getName = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Charu");
    }, 3000);
  });
};
const getAge = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(30);
    }, 1000);
  });
};

async function getUserDetails() {
  const result = await Promise.all([getName(), getAge()]);
  console.log(result);
}

getUserDetails();

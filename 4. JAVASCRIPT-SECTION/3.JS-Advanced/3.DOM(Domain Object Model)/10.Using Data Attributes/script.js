//Using `getAttribute` and `setAttribute`

const userCard = document.getElementById("userCard");
//console.log(userCard);
const userId = userCard.getAttribute("data-user-id");
//console.log(userId);
const userRole = userCard.getAttribute("data-user-role");
//console.log(userRole);
//Modifying data attributes

userCard.setAttribute("data-user-role", "super-admin");
userCard.setAttribute("data-user-position", "Engineer");
//console.log(userCard);

//Using the dataset
const userRole2 = userCard.dataset.userRole;
console.log(userRole2);

const userId2 = userCard.dataset.userId;
console.log(userId2);

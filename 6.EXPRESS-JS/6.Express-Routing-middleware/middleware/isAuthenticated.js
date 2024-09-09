//Mimic Authentication
const isAuthenticated = (req, res, next) => {
  const isLogin = true; // if false then it will go in else
  if (isLogin) {
    next(); //app.use("/users", isAuthenticated, userRouter);in this case next is userRouter
  } else {
    res.json({
      message: "Unauthorized",
    });
  }
};

module.exports = isAuthenticated;

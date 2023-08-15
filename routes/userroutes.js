const { signup, signin } = require("../controller/usercontroller");
const express = require("express");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/signin", signin);

module.exports = userRouter;

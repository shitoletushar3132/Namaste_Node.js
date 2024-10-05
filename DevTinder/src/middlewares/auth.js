const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");

const userAuth = async (req, res, next) => {
  //read the token from the req cookies

  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not found...");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
};

module.exports = { userAuth };

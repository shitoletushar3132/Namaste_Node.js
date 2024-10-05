const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  validateEditProfileData,
  validateNewPassword,
} = require("../utils/validation");
const User = require("../models/userSchema");
const profileRouter = express.Router();
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.status(400).send("Error :" + error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const logInUser = req.user;

    Object.keys(req.body).forEach((key) => (logInUser[key] = req.body[key]));
    await logInUser.save();
    res.json({
      message: `${logInUser.firstName} Your Profile Updated Successfully`,
      data: logInUser,
    });
  } catch (error) {
    res.status(400).send("Error :" + error);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    // Check if the new password is valid
    if (!validateNewPassword(req)) {
      return res.status(400).json({ error: "Invalid new password" });
    }

    const logInUser = req.user;

    const { currentPassword, newPassword } = req.body;

    // Check if the current password is correct
    const isPasswordCorrect = await logInUser.validatePassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    logInUser.password = passwordHash;
    await logInUser.save();

    // Send a success response
    return res.json({
      message: "Password updated successfully",
      data: logInUser,
    });
  } catch (error) {
    return res.status(500).json({
      error: "An error occurred while updating the password: " + error.message,
    });
  }
});

module.exports = profileRouter;

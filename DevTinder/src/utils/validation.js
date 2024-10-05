const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Provide a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );

  if (!validator.isURL(req.body.photoUrl)) {
    throw new Error("Photo URL is not Valid");
  }
  if (!validator.isLength(req.body.about, { min: 0, max: 75 })) {
    throw new Error("About is very long");
  }
  if (req.body.skills.length >= 6) {
    throw new Error("too Much skills");
  }
  return isEditAllowed;
};

const validateNewPassword = (req) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword) {
    throw new Error("Current password is required");
  }
  if (!newPassword) {
    throw new Error("New password is required");
  }
  if (!validator.isStrongPassword(newPassword)) {
    throw new Error("New password is not strong enoughf");
  }
  return true;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validateNewPassword,
};

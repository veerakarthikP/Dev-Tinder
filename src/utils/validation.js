const validator = require("validator");

const validateSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is requried");
  } else if (firstName.length < 4 || firstName.length > 40) {
    throw new Error("First name should have 4-50 characters!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Enter a valid email id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

const validateProfileEditFields = (req) => {
  const allowedProfileEditFields = [
    "firstName",
    "lastName",
    "gender",
    "age",
    "about",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedProfileEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignupData, validateProfileEditFields };

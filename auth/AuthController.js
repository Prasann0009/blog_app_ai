import { authenticateUser, saveUser } from "./AuthService.js";
import { GENDER } from "./constants.js";

const EMAIL_REGEXP = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// The password should be at least 8 characters long.
// It should contain at least one uppercase letter.
// It should contain at least one lowercase letter.
// It should contain at least one digit.
// It should contain at least one special character (like @, #, $, etc.).

const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const validateName = (name) => name && name.length >= 6;

const validateEmail = (email) => EMAIL_REGEXP.test(email);

const validatePassword = (password) => PASSWORD_REGEXP.test(password);

const validateGender = (gender) =>
  gender === GENDER.FEMALE || gender === GENDER.MALE;

export async function signupController(req, res) {
  const { name, email, password, gender } = req.body;
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateGender(gender) ||
    !validateName(name)
  ) {
    return res.status(400).json({ message: "Invalid details" });
  }
  //TODO: handle saving user to DB

  const result = await saveUser(req.body);
  if (result) {
    res.status(201).json({ message: "Signup successful" });
  } else {
    res.status(500).json({ message: "Signup failed! please try again" });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  if (!validateEmail(email) || !validatePassword(password)) {
    res.status(400).json({ message: "Invalid credentials" });
  }

  const result = await authenticateUser(req.body);
  const statusCode = result.status;
  delete result.status;
  res.status(statusCode).json({ ...result });
}

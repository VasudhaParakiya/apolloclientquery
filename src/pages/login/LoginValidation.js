

export function loginValidation(loginUser) {

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  let error = {};

  // email validation
  if (loginUser.email === "") {
    error.email = "Email is required";
  } else if (!emailRegex.test(loginUser.email)) {
    error.email = "Enter a valid e-mail address.";
  }

  // password validation
  // let hasNumber = /\d/.test(loginUser.password);
  // let hasUpperCase = /[A-Z]/.test(loginUser.password);
  // let hasLowerCase = /[a-z]/.test(loginUser.password);
  // let hasSpecialCharacter = /[!@#\$%\^\&*\)\(+=._-]/.test(loginUser.password);

  // let passError = [];

  // if (!hasNumber) {
  //   passError = [...passError, "password at list one numbar"];
  // }
  // if (!hasLowerCase) {
  //   passError = [
  //     ...passError,
  //     "Password must contain at least one lowercase letter.",
  //   ];
  // }
  // if (!hasUpperCase) {
  //   passError = [
  //     ...passError,
  //     "Password must contain at least one uppercase letter.",
  //   ];
  // }
  // if (!hasSpecialCharacter) {
  //   passError = [
  //     ...passError,
  //     "Password must contain at least one special character (!@#$%^&*()_-=+.)",
  //   ];
  // }

  if (loginUser.password ==="") {
    error.password = "password is required";
  } else {
    error.password = "";
  }

  return error;
}

import Validator from "validator";
import isEmpty from "is-empty";

const validateLoginInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = " *Podaj adres email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = " *Adres email jest nieprawidłowy";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = " *Podaj hasło";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;

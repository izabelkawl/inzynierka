import Validator from "validator";
import isEmpty from "is-empty";

const validateAllotmentInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.number = !isEmpty(data.number) ? data.number : "";
  data.allotment_width = !isEmpty(data.allotment_width) ? data.allotment_width : "";
  data.allotment_length = !isEmpty(data.allotment_length) ? data.allotment_length : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.user_id = !isEmpty(data.user_id) ? data.user_id : "";

  // Number checks
  if (Validator.isEmpty(data.number)) {
    errors.number = " *Podaj numer działki";
  }else if (!Validator.isNumeric(data.number)) {
    errors.phone = " *Zły format";
  }
  // Width checks
  if (Validator.isEmpty(data.allotment_width)) {
    errors.allotment_width = " *Podaj szerokość";
  }else if (!Validator.isNumeric(data.allotment_width)) {
    errors.allotment_width = " *Zły format";
  }
  // Length checks
  if (Validator.isEmpty(data.allotment_length)) {
    errors.allotment_length = " *Długość jest wymagana";
  }else if (!Validator.isNumeric(data.allotment_length)) {
    errors.allotment_length = " *Zły format";
  }
  // Price checks
  if (Validator.isEmpty(data.price)) {
    errors.price = " *Cena jest wymagana";
  }else if (!Validator.isNumeric(data.price)) {
    errors.price = " *Zły format";
  }
  // Status checks
  if (Validator.isEmpty(data.status)) {
    errors.status = " *Podaj status";
  } 
  // User checks
  if (Validator.isEmpty(data.user_id)) {
    errors.user_id = " *Wybierz działkowicza";
  } 
 
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateAllotmentInput;

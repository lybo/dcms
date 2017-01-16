export function validate(value, validate, isRequired) {
    let isValid = true;
    if (validate && isRequired && value !== undefined && value.toString().trim() === '') {
        isValid = false;
    }

    return isValid;
}


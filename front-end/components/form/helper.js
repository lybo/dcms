export function validate(value, validate, isRequired) {
    let isValid = true;
    if (validate && isRequired && value.trim() === '') {
        isValid = false;
    }

    return isValid;
}


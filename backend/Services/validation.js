export const validateFullName = (name) => {
    const regex = /^[A-Za-z ]{3,50}$/;
    return regex.test(name);
};

export const validateIdNumber = (id) => {
    const regex = /^[0-9]{13}$/;
    return regex.test(id);
};

export const validateAccountNumber = (acc) => {
    const regex = /^[0-9]{6,20}$/;
    return regex.test(acc);
};

export const validateSwiftCode = (code) => {
    const regex = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;
    return regex.test(code);
};

export const validateAmount = (amount) => {
    return typeof amount === "number" && amount > 0;
};
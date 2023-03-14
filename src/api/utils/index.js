export const emailValidation = function (email) {
    let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (Array.isArray(email)) {
        for(let i = 0; i < email.length; i++) {
            if (!regex.test(email[i])) {
                return false;
            }
        }
        return true;
    }
    
    return regex.test(email);
}
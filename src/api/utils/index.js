export const emailValidation = function (email) {
    let regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

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
module.exports = {
    validateRegister: (username, password) => {
        const errors = {};

        if (username.trim().length < 6 && !STR_REGEX.test(username)) {
            errors.username = `Username must be longer than 5 characters, shorter than 33 characters 
                and cannot contain special characters!`;
        }

        if (password.trim().length < 6) {
            errors.password = "Password must be longer than 5 characters!";
        }

        // if (password !== confirmPassword) {
        //     errors.confirmPassword =
        //         "Password and Confirm Password must match!";
        // }

        return {
            errors,
            valid: Object.keys(errors).length < 1,
        };
    },

    validateLogin: (username, password) => {
        const errors = {};

        if (username.trim() === "") {
            errors.username = "Username must not be empty";
        }

        if (password.trim() === "") {
            errors.password = "Password must not be empty";
        }

        return {
            errors,
            valid: Object.keys(errors).length < 1,
        };
    },
};

const STR_REGEX = /^[a-zA-Z0-9!@#$%^&*]{5,32}$/;

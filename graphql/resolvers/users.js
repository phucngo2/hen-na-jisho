const { UserInputError } = require("apollo-server-express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const { validateRegister, validateLogin } = require("../../utils/validation");
const { SECRET_KEY } = require("../../config");

module.exports = {
    Mutation: {
        register: async (
            parent,
            { registerInput: { username, password } }
        ) => {
            const { errors, valid } = validateRegister(
                username,
                password,
            );

            if (!valid) {
                throw new UserInputError("Error", { errors });
            }

            // Check exist
            const existUser = await User.findOne({ username });
            if (existUser) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken!",
                    },
                });
            }

            const newUser = new User({
                username,
                password,
            });

            const result = await newUser.save();

            const token = generateToken(result);

            return {
                ...result._doc,
                id: result._id,
                token,
            };
        },

        login: async (parent, { username, password }) => {
            const { errors, valid } = validateLogin(username, password);

            if (!valid) {
                throw new UserInputError("Error", { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "Wrong username or password";
                throw new UserInputError("Wrong credential", { errors });
            }

            const match = await bcrypt.compare(password, user.password);

            if (!match) {
                errors.general = "Wrong username or password";
                throw new UserInputError("Wrong credential", { errors });
            }

            const token = generateToken(user);

            var isAdmin = false;
            if (user.isAdmin) {
                isAdmin = user.isAdmin;
            }

            return {
                ...user._doc,
                id: user._id,
                token,
                isAdmin,
            };
        },
    },
};

function generateToken(user) {
    if (user.isAdmin) {
        return jwt.sign(
            {
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin,
            },
            SECRET_KEY
        );
    }

    return jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        SECRET_KEY,
        { expiresIn: "2h" }
    );
}

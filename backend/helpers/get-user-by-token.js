const jwt = require('jsonwebtoken');
const User = require('../model/UserModel');

const getUserByToken = async (token) => {
    if (!token) {
        throw new Error("Token is missing!");
    }

    try {
        const decoded = jwt.verify(token, 'nossosecret');
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error("User not found!");
        }

        return user;
    } catch (error) {
        console.error('Error in getUserByToken:', error);
        throw error;
    }
};

module.exports = getUserByToken;

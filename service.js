const User = require('./models/userModel');
const bcrypt = require('bcrypt');
const { logger } = require('./config/logger');


const saveUserInfo = async (requestBody) => {
    try {
        const createUser = new User({
            username : requestBody.username,
            firstname : requestBody.firstname,
            lastname : requestBody.lastname,
            email : requestBody.email,
        });
    
        createUser.password = await hashPassword(requestBody.password);
        return await createUser.save();
    } catch (error) {
        logger.error(`Error occured - ${error}`);
    }
}

const isUserExists = async (usernameToCheck) => {
    return await User.findOne({
        username: usernameToCheck
    });
}

const isPasswordMatched = async (passwordEnteredByUser, passwordInDb) => {
    return await bcrypt.compare(passwordEnteredByUser, passwordInDb);
}

const hashPassword = async (passwordToHash) => {
    try {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(passwordToHash, salt);
    } catch(error) {
        logger.error(`Error occured - ${error}`);
    }
}

module.exports = { saveUserInfo, isUserExists, isPasswordMatched };
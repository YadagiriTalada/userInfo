const { saveUserInfo, isUserExists, isPasswordMatched } = require('./service');
const { logger } = require('./config/logger');
const { REQUIRED_PARAMS_MISSED, USER_NOT_EXISTS, INCORRECT_PASSWORD } = require('./config/errorConstants.json');

const createUser = async (request, response) => {
    try {
            const reqBody = request.body;
            if(!isValidateRequestBody(reqBody)) {
                logger.error(`Error Occured -  ${REQUIRED_PARAMS_MISSED}`);
                response.status(400).send({ message: `${REQUIRED_PARAMS_MISSED}` });
                return;
            }

            const saveUserInfoResponse = await saveUserInfo(reqBody);
            if(saveUserInfoResponse) {
                logger.info(`A verification mail has been sent to your registered email !`);
                response.status(200).send({
                    message: `A verification mail has been sent to your registered email !`
                });
            }
    } catch(error) {
        logger.error(`Error occured: ${error}`);
    }
}

const userLogin = async (request, response) => {
    try {
        if(!isValidUsername(request.body.username) || !isValidPassword(request.body.password)) {
            logger.error(`Error Occured -  ${REQUIRED_PARAMS_MISSED}`);
            response.status(400).send({ message: `${REQUIRED_PARAMS_MISSED}` });
            return;
        }

        const isExistedUser = await isUserExists(request.body.username);

        if(!isExistedUser) {
            logger.error(`Error Occured - ${USER_NOT_EXISTS}`);
            response.status(400).send({ message: `${USER_NOT_EXISTS}` });
            return;
        }

        const passwordCheck = await isPasswordMatched(request.body.password, isExistedUser.password);
        if(passwordCheck === true) {
            const responseToSend = handleResponse(isExistedUser);
            response.status(200).send(responseToSend);
        } else {
            logger.error(`Error Occured - ${INCORRECT_PASSWORD}`);
            response.status(400).send({ message: `${INCORRECT_PASSWORD}` });
        }   
    } catch(error) {
        logger.error(`Error occured: ${error}`);
    }
}

const isValidateRequestBody = (reqBodyToValidate) => {
    return reqBodyToValidate.username && reqBodyToValidate.password && reqBodyToValidate.firstname && reqBodyToValidate.lastname && reqBodyToValidate.email;
}

const isValidUsername = (usernameToValidate) => {
    return usernameToValidate && usernameToValidate.trim().length;
}

const isValidPassword = (passwordToValidate) => {
    return passwordToValidate && passwordToValidate.trim().length;
}

const handleResponse = (userDetails) => {
    return {
        token: generateRandomToken(),
        user: {
            id: userDetails._id,
            username: userDetails.username,
            firstname: userDetails.firstname,
            lastname: userDetails.lastname,
            email: userDetails.email
        }
    }
}

const generateRandomToken = () => {
    const randomGenerator = Math.random().toString(36).substr(2);
    return randomGenerator + randomGenerator;
}

module.exports = { createUser, userLogin };
const throwError = (status, message) => {
    throw { 
        status: status, 
        error: new Error(message) 
    };
};

module.exports = throwError;
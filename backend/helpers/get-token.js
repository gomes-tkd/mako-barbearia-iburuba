const getToken = (req) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);
        return token;
    }

    return null;
};

module.exports = getToken;

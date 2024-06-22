const jwt = require("jsonwebtoken");
const getToken = require("./get-token");
const {verify} = require("jsonwebtoken");

// middleware to validate token
function checkToken(req, res, next) {
    if(!req.headers.authorization) {
        res.status(401).json({ message: "Denied access!"});
    }

    const token = getToken(req);

    if(!token) {
        res.status(401).json({ message: "Denied access!!"});
    }

    try {
        // make the token verify
        req.user = jwt.verify(token, "nossosecret");
        next();
        return true;
    } catch (e) {
        res.status(400).json({ message: "Invalid token!"});
        return false;
    }
}

module.exports = checkToken;

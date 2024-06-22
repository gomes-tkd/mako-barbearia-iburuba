// token de autenticação
const jwt = require("jsonwebtoken");

const createUserToken = (user, req, res) => {
    try {
        // cria o token
        const token = jwt.sign({
            name: user.name,
            id: user._id
        }, 'nossosecret');

        // retorna o token
        res.status(200).json({
            message: 'Auth successfully',
            token: token,
            userId: user._id
        });

        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

module.exports = createUserToken;

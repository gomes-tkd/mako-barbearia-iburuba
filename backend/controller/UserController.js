const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUserToken = require("../helpers/create-user-token");
const getToken = require("../helpers/get-token");
const getUserbyToken = require("../helpers/get-user-by-token");
const {hash} = require("bcrypt");
const Phones = require("../model/PhonesModel");
const getUserByToken = require("../helpers/get-user-by-token");

module.exports = class UserController {
    static async register(req, res) {
        const { nome, contato, email, senha } = req.body;

        // validations
        if (!nome) {
            return res.status(422).json({ message: "Campo nome é obrigatório" });
        }

        if (!contato) {
            return res.status(422).json({ message: "Campo contatos é obrigatório" });
        }

        if (!email) {
            return res.status(422).json({ message: "Campo email é obrigatório" });
        }

        if (!senha) {
            return res.status(422).json({ message: "Campo password é obrigatório" });
        }

        // checando se o usuário existe
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(422).json({ message: "Email já existente. Por favor, informe outro." });
        }

        // create an encrypted user password
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        // creating a new user
        const user = new User({
            nome,
            contato,
            email,
            senha: passwordHash,
            tipoUsuario: "cliente"
        });

        try {
            // salva o usuário
            const newUser = await user.save();

            // log the user in and create a token
            createUserToken(newUser, req, res);

            // Não enviar uma resposta adicional aqui
        } catch (e) {
            return res.status(500).json({ msg: e.toString() });
        }
    }

    // login
    static async login(req, res) {
        const { email, senha } = req.body;

        if (!email) {
            return res.status(422).json({ message: "Campo email é obrigatório" });
        }

        if (!senha) {
            return res.status(422).json({ message: "Campo password é obrigatório" });
        }

        // checando se o usuário existe
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(422).json({ message: "Usuário não cadastrado." });
        }

        // check se o password match by bcrypt
        const checkPassword = await bcrypt.compare(senha, user.senha);

        if (!checkPassword) {
            return res.status(422).json({ message: "Senha incorreta." });
        }

        // loga o usuário e cria o token
        createUserToken(user, req, res);

        // Não enviar uma resposta adicional aqui
    }

    // access the current user's token
    static  async checkUser(req, res) {
        let currentUser = undefined;

        // location to set/place the token
        if(req.headers.authorization) {

            // access the token
            const token = getToken(req);
            const decoded = jwt.verify(token, "nossosecret");

            // find the user by id
            currentUser = await User.findById(decoded.id);
            // currentUser.password = undefined;

        } else {
            currentUser = null;
        }

        try {
            res.status(200).send(currentUser);
            return true;
        } catch (e) {
            console.log(e.message.toString());
            return false;
        }

    }

    static async getUserById(req, res) {
        const id = req.params.id;

        // find the user by his ID and remove the password field
        const user = await User.findById(id).select("-password");

        if(!user) {
            res.status(422).json({ message: "Usuário não encontrado."});
            return false;
        }

        try {
            res.status(200).json({ user });
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }
    }

    static async editUserPassword(req, res) {
        const { senha, confirmarSenha } = req.body;

        if (!senha || !confirmarSenha) {
            return res.status(400).json({ message: "Preencha a senha e a confirmação da senha!" });
        }

        if (senha !== confirmarSenha) {
            return res.status(400).json({ message: "As senhas devem ser iguais!" });
        }

        try {
            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "Acesso negado!" });
            }

            const decodedToken = jwt.verify(token, "nossosecret");

            if (!decodedToken) {
                return res.status(401).json({ message: "Token inválido!" });
            }

            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const novaSenhaHash = await bcrypt.hash(senha, 12);
            user.senha = novaSenhaHash;

            await user.save();

            res.status(200).json({ message: "Senha atualizada com sucesso!" });
        } catch (error) {
            res.status(500).json({ message: `Erro ao atualizar a senha: ${error.message}` });
        }
    }

    static async editUserEmail(req, res) {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "O campo de email não pode estar vazio." });
        }

        try {
            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "Acesso negado!" });
            }

            const decodedToken = jwt.verify(token, "nossosecret");

            if (!decodedToken) {
                return res.status(401).json({ message: "Token inválido!" });
            }

            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            const isEmailExist = await User.findOne({ email });

            if (isEmailExist && isEmailExist._id.toString() !== user._id.toString()) {
                return res.status(422).json({ message: "Email já cadastrado!" });
            }

            user.email = email;

            await user.save();

            return res.status(200).json({ message: "Email atualizado com sucesso!" });
        } catch (e) {
            return res.status(400).json({ message: `Erro ao atualizar email: ${e.message}` });
        }
    }

    static async editUserName(req, res) {
        const id = req.params.id;
        const { nome } = req.body;

        if(!nome) {
            res.status(401).json({ message: "Preencha o campo nome!" });
            return false;
        }

        try {
            const token = getToken(req);

            if (!token) {
                return res.status(401).json({ message: "Acesso negado!" });
            }

            const decodedToken = jwt.verify(token, "nossosecret");

            if (!decodedToken) {
                return res.status(401).json({ message: "Token inválido!" });
            }

            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }


            user.nome = nome;

            await user.save();

            return res.status(200).json({ message: "Nome atualizado com sucesso!" });
        } catch (e) {
            res.status(401).json({ message: `Erro ao atualizar o nome: ${e.message.toString()}` });
            return false;
        }

    }

    static async editUserPhone(req, res) {
        const { contato } = req.body;

        if(!contato) {
            res.status(401).json({ message: "Preencha o campo contato!" });
            return false;
        }

        try {
            const token = getToken(req);
            if (!token) {
                return res.status(401).json({ message: "Acesso negado!" });
            }

            const decodedToken = jwt.verify(token, "nossosecret");

            if (!decodedToken) {
                return res.status(401).json({ message: "Token inválido!" });
            }

            const user = await User.findById(decodedToken.id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }


            user.contato = contato;

            await user.save();

            return res.status(200).json({ message: "Nome atualizado com sucesso!" });

        } catch (e) {
            res.status(401).json({ message: `Erro ao atualizar o telefone: ${e.message.toString()}` });
            return false;
        }
    }

    static async editUser(req, res) {
        const id = req.params.id;

        // check if user exists
        const token = getToken(req);
        const user = await getUserbyToken(token);

        const { name, email, password, confirmPassword } = req.body;

        // verify if there's a file in the req
        if(req.file) {
            user.image = req.file.filename;
        }

        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" });
            return true;
        }

        user.name = name;

        if (!email) {
            res.status(422).json({ message: "O e-mail é obrigatório!" });
            return true;
        }


        // check if the email already exists
        const isEmailExists = await User.findOne({ email: email })

        if (user.email !== email && isEmailExists ) {
            res.status(422).json({ message: "Por favor, utilize outro e-mail!" });
            return;
        }

        user.email = email;

        if (!phone) {
            res.status(422).json({ message: "O telefone é obrigatório!" });
            return;
        }

        user.phone = phone;


        if(password !== confirmPassword) {
            res.status(422).json({ message: "As senhas devem ser iguais!" });
        } else if ((password === confirmPassword) && (password !== null)) {

            // create an encrypted user password
            if (password) {
                const salt = await bcrypt.genSalt(12);
                const passwordHash = await bcrypt.hash(password, salt);
                user.password = passwordHash;
            }
        }


        try {

            // return user data updated
            await User.findByIdAndUpdate(
                {_id: user._id},
                { $set: user },
                { new: true }
            );

            res.status(200).json({ message: "User updated with success!!" });
            return true;
        } catch (e) {
            res.status(500).json({ message: e.toString() });
            return false;
        }
    }
}

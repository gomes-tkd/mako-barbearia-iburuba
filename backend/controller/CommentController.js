const mongoose = require("../db/conn");
const Comment = require("../model/CommentModel");
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const jwt = require("jsonwebtoken");
const User = require("../model/UserModel");

module.exports = class CommentController {
    static async postComment(req, res) {
        // getting the user
        const token = getToken(req);
        const user = await getUserByToken(token);

        if (!user) {
            res.status(401).json({ message: "Usuário precisa estar logado para postar um comentário"});
            return false;
        }

        const { comentario } = req.body;

        if(!comentario) {
            res.status(401).json({ message: "Campo do comentário deve ser preenchido"});
            return false;
        }

        // creating a new commentary
        const comment = new Comment({
            autorId: user._id,
            autorNome: user.nome,
            comentario
        });

        try {
            // save the comment on DB
            const newComment = await comment.save();

            res.status(201).json({ message: "new comment added with success", newComment });
            return true;
        } catch (e) {
            res.status(500).json({ massage: e.toString() });
            return false;
        }
    }

    static async getCommentById(req, res) {
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


        try {
            const comments = await Comment.find({autorId: user._id }).sort("-createdAt");

            res.status(200).json({ message: "All comments at moment!", comments: comments });
            return true;
        } catch (e) {
            console.log(e.toString());
            return false;
        }
    }

    static async updateComment(req, res) {
        const userId = req.params.userId;
        const commentId = req.params.commentId;
        const { novoComentario } = req.body;

        try {
            // Verifica se o usuário existe
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            // Verifica se o comentário existe e pertence ao usuário
            const comment = await Comment.findOne({ _id: commentId, autorId: userId });

            if (!comment) {
                return res.status(404).json({ message: "Comentário não encontrado." });
            }

            // Atualiza o comentário
            comment.comentario = novoComentario;
            await comment.save();

            return res.status(200).json({ message: "Comentário atualizado com sucesso!", comment });
        } catch (error) {
            return res.status(500).json({ message: `Erro ao atualizar o comentário: ${error.message}` });
        }
    }

    static async deleteComment(req, res) {
        const userId = req.params.userId;
        const commentId = req.params.commentId;

        try {
            // Verifica se o usuário existe
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            // Verifica se o comentário existe e pertence ao usuário
            const comment = await Comment.findOne({ _id: commentId, autorId: userId });
            if (!comment) {
                return res.status(404).json({ message: "Comentário não encontrado." });
            }

            // Deleta o comentário
            await comment.deleteOne({ _id: commentId });

            return res.status(200).json({ message: "Comentário deletado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ message: `Erro ao deletar o comentário: ${error.message}` });
        }
    }

    static async getAllComments(req, res) {

        try {
            const comments = await Comment.find().sort("-createdAt");

            res.status(200).json({ message: "All comments at moment!", comments: comments });

            return true;
        } catch (e) {
            console.log(e.toString());
            return false;
        }

    }
}

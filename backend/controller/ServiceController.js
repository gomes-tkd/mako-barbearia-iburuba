const getToken = require("../helpers/get-token");
const User = require("../model/UserModel");
const Service = require("../model/ServicesModal");

module.exports = class ServiceController {
    static async registrarServico(req, res) {
        const id = req.params.id;
        const { nomeServico, precoServico } = req.body;

        try {
            const token = getToken(req);

            if (!token) {
                return res.status(400).json({ message: "Acesso negado!" });
            }

            const user = await User.findById(id);

            if (!user) {
                return res.status(400).json({ message: "usuário não encontrado!" });
            }

            if (user.tipoUsuario !== "adm") {
                return res.status(400).json({ message: "usuário não autorizado para cadastrar novos serviços!" });
            }

            const novoServico = new Service({
                nomeServico,
                precoServico
            });

            await novoServico.save();
            res.status(200).json({ msg: "Novo serviço adicionado!", novoServico });
            return true;
        } catch (e) {
            res.status(500).json({ msg: "Erro ao cadastrar produto "});
            return false;
        }
    }

    static async editarServico(req, res) {
        const id = req.params.id;
        const servicoId = req.params.servicoId;
        const { nomeServico, precoServico } = req.body;

        const token = getToken(req);

        if(!token) {
            return res.status(400).json({ message: "Acesso negado!" });
        }

        try {
            const user = await User.findById(id);

            if(!user) {
                return res.status(400).json({ msg: "Usuário não encontrado! "});
            }

            if (user.tipoUsuario !== "adm") {
                return res.status(400).json({ msg: "Usuário não poder atualizar os serviços!" });
            }

            const servico = await Service.findById(servicoId);

            if(!servico) {
                return res.status(400).json({ msg: "Serviço não encontrado! "});
            }

            servico.nomeServico = nomeServico;
            servico.precoServico = precoServico;

            await servico.save();

            res.status(200).json({ msg: "Serviço atualizado com sucesso!", servico });

            return true;
        } catch (e) {
            res.status(500).json({ msg: "Erro ao editar produto!" });
        }
    }

    static async deletarServico(req, res) {
        const id = req.params.id;
        const servicoId = req.params.servicoId;

        const token = getToken(req);

        if(!token) {
            return res.status(400).json({ message: "Acesso negado!" });
        }

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(400).json({ msg: "Usuário não encontrado!" });
            }

            if(user.tipoUsuario !== "adm") {
                return res.status(400).json({ msg: "Usuário não deletar serviços!" });
            }

            const servico = await Service.findById(servicoId);

            if(!servico) {
                return res.status(400).json({ msg: "Serviço não encontrado!" });
            }

            await servico.deleteOne({ _id: servicoId });

            res.status(200).json({ msg: "Serviço deletado com sucesso!", servico });
            return true;
        } catch (e) {
            res.status(500).json({ msg: "Erro ao deletar o serviço!" });
            return false;
        }
    }

    static async getAllServicos(req, res) {
        try {
            const servicos = await Service.find().sort("-createdAt");

            res.status(200).json({ message: "Todos serviços até o momento!", servicos: servicos });return true;

        } catch (e) {
            console.log(e.toString());
            return false;
        }
    }
}

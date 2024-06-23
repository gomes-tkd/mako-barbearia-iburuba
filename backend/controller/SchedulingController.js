const Scheduling = require("../model/SchedulingModel");
const Earn = require("../model/EarnModel");
const ObjectId = require("mongoose").Types.ObjectId;
const getToken = require("../helpers/get-token");
const getUserByToken = require("../helpers/get-user-by-token");
const {verify} = require("jsonwebtoken");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");
const Service = require("../model/ServicesModal");
const Schedule = require("../model/SchedulingModel");

module.exports = class SchedulingController {
    static async scheduling(req, res) {
        const id = req.params.id;
        const { servicosRequisitados } = req.body;

        const token = getToken(req);

        if (!token) {
            return res.status(401).json({ message: "Acesso negado!" });
        }

        try {
            const user = await User.findById(id);

            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }

            if (!servicosRequisitados || servicosRequisitados.length === 0) {
                return res.status(400).json({ message: "Nenhum serviço requisitado." });
            }

            // Verifica se os serviços requisitados existem no banco de dados
            const existingServices = await Service.find({ _id: { $in: servicosRequisitados } });

            if (existingServices.length !== servicosRequisitados.length) {
                return res.status(400).json({ message: "Um ou mais serviços são inválidos." });
            }

            // Verifica se há serviços duplicados na lista
            const uniqueServices = [...new Set(servicosRequisitados)];

            if (uniqueServices.length !== servicosRequisitados.length) {
                return res.status(400).json({ message: "Cada serviço só pode ser selecionado uma vez." });
            }

            // Cria o novo agendamento com os dados do usuário e os serviços requisitados
            const novoAgendamento = new Schedule({
                clienteId: user._id,
                clienteNome: user.nome,
                clienteContato: user.contato,
                servicosRequisitados: existingServices.map(service => service._id),
            });

            await novoAgendamento.save();

            res.status(200).json({ msg: "Agendado com sucesso!", novoAgendamento });
            return true;
        } catch (e) {
            console.error(e);
            res.status(500).json({ msg: "Erro ao agendar!", error: e.message });
            return false;
        }
    }

    static async removeScheduling(req, res) {
        // check if id exists
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ message: "Invalid ID "});
            return false;
        }

        // check if scheduling exists
        const scheduling = await Scheduling.findOne({ _id: id });

        if(!scheduling) {
            res.status(404).json({ message: "Appointment not found "});
            return false;
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        // check if scheduling id is the same of user
        if(scheduling.clientId.toString() !== user._id.toString()) {
            res.status(422).json({ message: "não was possible to process your solicitation"});
        }

        try {
            await Scheduling.findByIdAndDelete(id);
            res.status(200).json({ message: "Appointment removed with success" });

            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }

    }

    static async getAllScheduling(req, res)
    {
        const id = req.params.id;
        const token = getToken(req);

        try {
            if(!token) {
                res.status(401).json({ message: "Acesso não autorizado!" });
                return false;
            }

            const user = await User.findById(id);

            if(!user) {
                res.status(401).json({ message: "Usuário não encontrado!" });
                return false;
            }

            if(user.tipoUsuario !== "adm") {
                res.status(401).json({ message: "Usuário não autorizado!" });
                return false;
            }


            const scheduling = await Scheduling.find().sort("-createdAt");
            res.status(200).json({ message: "All scheduling at moment!", scheduling: scheduling });
            return true;
        } catch (e) {
            console.log(e.message);
            return false;
        }

    }

    static async getSchedulingById(req, res) {
        const userId = req.params.id; // ID do usuário autenticado obtido dos parâmetros da requisição

        try {
            // Encontra todos os agendamentos do usuário autenticado
            const scheduling = await Scheduling.find({ clienteId: userId }).sort("-createdAt");

            if (!scheduling || scheduling.length === 0) {
                return res.status(404).json({ message: "Agendamentos não encontrados." });
            }

            res.status(200).json({ message: "Agendamentos encontrados!", scheduling });
            return true;
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: "Erro ao pegar os agendamentos do usuário!" });
            return false;
        }
    }


}

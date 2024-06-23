"use server";
import api from "@/functions/api";
import apiError from "@/functions/api-error";
import login from "@/app/actions/login";

export default async function registrar(data: {}, formData: FormData) {
    const nome = formData.get("username") as string | null;
    const contato = formData.get("contato") as string | null;
    const email = formData.get("email") as string | null;
    const senha = formData.get("password") as string | null;
    const confirmarSenha = formData.get("confirmPassword") as string | null;

    try {
        if(!nome || !email || !senha || !confirmarSenha || !contato) {
            throw new Error("Preencha os campos!");
        }

        if(senha !== confirmarSenha) {
            throw new Error("As senhas devem ser iguais!");
        }

        const data = await api.post("/user/register", {
            nome, contato, email, senha
        }, { method: "POST" }).then(response => response.data);

        if (data) {
            await login({ ok: true, error: ""}, formData);
        } else {
            throw new Error("Erro ao logar!");
        }

        return {
            data: data,
            ok: true,
            error: ""
        }
    } catch (e) {
        return apiError(e)
    }
}

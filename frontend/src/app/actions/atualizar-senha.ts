"use server";
import api from "@/functions/api";
import apiError from "@/functions/api-error";
import {cookies} from "next/headers";

type UserInfo = {
    _id: string;
    senha: string;
    confirmarSenha: string;
}

export default async function atualizarSenha({ _id, senha, confirmarSenha }: UserInfo) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            throw new Error("Acesso não autorizado!");
        }

        if (!senha || !confirmarSenha) {
            throw new Error("Preencha os campos!");
        }

       if(senha !== confirmarSenha) {
           throw new Error("As senhas devem ser iguais!");
       }

       await api.patch(`/user/${_id}/edit/senha`, {
           senha, confirmarSenha,
       }, {
           headers: {
               Authorization: `Bearer ${token}`,
           }
       }).then(response => response.data);

        return true;
    } catch (e: unknown) {
        return false;
    }
}

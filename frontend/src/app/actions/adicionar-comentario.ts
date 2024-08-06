"use server";
import api from "@/functions/api";
import {cookies} from "next/headers";
import getUser from "@/app/actions/get-user";
import apiError from "@/functions/api-error";

type ComentarioProps = {
  autorId: string;
  autorNome: string;
  comentario: string;
};

type Usuario = {
  data: {
    _id: string;
    nome: string;
    email: string;
    contato: string;
    tipoUsuario: string;
    cpf: string;
  }
}

export default async function adicionarComentario(comentario: string) {
  const user = await getUser() as unknown as Usuario;
  if(!user) {
    throw new Error("Usuário inválido!");
  }

  const token = cookies().get("token")?.value as string;

  if (!token) {
    throw new Error("Token inválido!");
  }

  try {
    const data = await api.post(`comment/${user.data._id}/comments/post`, {
      comentario, autorId: user.data._id, autorNome: user.data.nome,
    },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then(response => response.data);

    if (!data) {
      throw new Error(`Erro ao pegar os agendamentos do id: ${user.data._id}`);
    }

    return {
      data,
      ok: false,
      error: ""
    }
  } catch (e: any) {
    apiError(e);
  }
}

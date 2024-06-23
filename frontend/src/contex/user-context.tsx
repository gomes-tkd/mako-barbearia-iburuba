"use client";
import React from "react";
import verifyToken from "@/app/actions/verify-token";
import logout from "@/app/actions/logout";

type Usuario = {
    _id: string;
    nome: string;
    email: string;
    contato: string;
}

type IUserContext = {
    usuario: Usuario | null;
    setUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const UserContext = React.createContext<IUserContext | null>(null);

export function useUser() {
    const context = React.useContext(UserContext);

    if (!context) {
        throw new Error("Contexto precisa estar dentro de um provider!");
    }

    return context;
}

export function UserContextProvider({ children, usuario }: { children: React.ReactNode; usuario: Usuario | null }) {
    const [userState, setUser] = React.useState<Usuario | null>(usuario);

    React.useEffect(() => {
        async function validate() {
            const ok = await verifyToken();

            if (!ok) {
                await logout();
                setUser(null); // Adicione isso para garantir que o usuário seja removido
            }
        }

        if (userState) {
            validate();
        }
    }, [userState]);

    return (
        <UserContext.Provider value={{ usuario: userState, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

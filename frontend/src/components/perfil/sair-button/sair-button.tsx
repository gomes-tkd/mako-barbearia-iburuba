"use client";
import {useUser} from "@/contex/user-context";
import logout from "@/app/actions/logout";

export default function SairButton() {
    const { setUser } = useUser();
    async function handleLogout() {
        await logout();
        setUser(null);
    }

    return (
        <button onClick={handleLogout}>Sair</button>
    )
}

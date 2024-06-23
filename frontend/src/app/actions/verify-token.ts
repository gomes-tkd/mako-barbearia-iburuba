"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default async function verifyToken () {
    const token = cookies().get("token")?.value as string;

    if(!token) {
        return false;
    }

    try {
        await jwtVerify(token, new TextEncoder().encode(
            "nossosecret"
        ));

        return true;
    } catch (e) {
        return false;
    }
}


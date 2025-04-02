"use server"

import { auth, signIn, signOut } from "@/auth"
import { log } from "console"

export async function signInWithGoogle() {
    return await signIn("google")
}


export async function signOutOfGoogle() {
    return await signOut()
}

export async function getUser() {
    const user = await auth()

    return user
}
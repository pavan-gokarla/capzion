import { log } from "console"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google],

    session: {
        strategy: "jwt",
        maxAge: 3600 //seconds
    }

})
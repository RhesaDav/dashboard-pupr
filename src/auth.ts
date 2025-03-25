import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import {prisma} from "@/lib/prisma"
import Credentials from "next-auth/providers/credentials";
// import {hash} from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
        credentials: {
            email: {},
            password: {}
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        authorize: async (credentials) => {
            let user = null
 
        // // logic to salt and hash password
        // const pwHash = hash(String(credentials.password), 10)
 
        // logic to verify if the user exists
        user = {
            email: "a",
            password: "123456"
        }
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          throw new Error("Invalid credentials.")
        }
 
        // return user object with their profile data
        return user

        }
    })
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth;
    },
  },
});

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { UserRole } from "@prisma/client"
// import { loginSchema } from "@/lib/validation"

declare module "next-auth" {
  interface User {
    role: UserRole
  }
  
  interface Session {
    user: User & {
      id: string
      role: UserRole
    }
  }
}

const SignInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const { 
  handlers: { GET, POST },
  auth,
  signIn,
  signOut 
} = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)
        
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          
          const user = await prisma.user.findUnique({ 
            where: { email } 
          })
          
          if (!user || !user.password) return null
          
          const passwordMatch = await bcrypt.compare(
            password, 
            user.password
          )
          
          if (passwordMatch) return user
        }
        
        return null
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    }
  },
  events: {
    async signIn({ user }) {
      // Optional: Log sign-in events
      console.log(`User ${user.email} signed in`)
    }
  }
})
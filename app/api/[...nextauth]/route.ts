import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
import { verifyOtpCode } from "@/lib/otp"; 
import { PrismaClient } from '@prisma/client';
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      phone: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" as const },
  providers: [
    CredentialsProvider({
      name: "SMS OTP",
      credentials: {
        phone: { label: "Phone", type: "text" },
        code:  { label: "OTP",   type: "text" },
      },
      async authorize(credentials) {
        const { phone, code } = credentials!;
        // verify OTP from your Otp table
        const ok = await verifyOtpCode(phone, code);
        if (!ok) return null;

        // find-or-create user... add adapter logic
        let user = await prisma.user.findUnique({ where: { phone } });
        if (!user) {
          user = await prisma.user.create({ data: { phone } });
        }
        return { id: user.id, phone: user.phone };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user = { id: token.sub!, phone: token.phone! };
      return session;
    },
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.phone = user.phone;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
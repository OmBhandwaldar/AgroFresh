import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id:     string;
    phone:  string;
    name:   string;
  }
  interface Session {
    user: {
      id:    string;
      phone: string;
      name:  string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    phone?: string;
    name?:  string;
  }
}

// NextAuth configuration

import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Phone & Password",
      credentials: {
        phone:    { label: "Phone",    type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const phone    = credentials?.phone;
        const password = credentials?.password;
        if (!phone || !password) return null;
        const user = await prisma.user.findUnique({ where: { phone } });
        if (!user) return null;
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return null;
        return { id: user.id, phone: user.phone, name: user.name };
      },
    }),
  ],
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.phone = user.phone;
        token.name  = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id    = token.sub!;
      session.user.phone = token.phone!;
      session.user.name  = token.name!;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
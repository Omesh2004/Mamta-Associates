import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "placeholder_google_id",
      clientSecret: process.env.GOOGLE_SECRET || "placeholder_google_secret",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const emailInput = credentials?.email?.trim();
        const passwordInput = credentials?.password?.trim();

        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

        if (ADMIN_EMAIL && ADMIN_PASSWORD && emailInput === ADMIN_EMAIL && passwordInput === ADMIN_PASSWORD) {
          return { id: "1", name: "Admin", email: ADMIN_EMAIL, role: "admin" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "user";
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        if (ADMIN_EMAIL && user.email === ADMIN_EMAIL) {
          token.role = "admin";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret_for_local_development_only",
};
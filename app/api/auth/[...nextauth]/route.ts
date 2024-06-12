import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import connectMongoDB from "@/libs/mongodb";
import Users from "@/models/users";
import { checkPassword } from "@/Components/Functions";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  pages: {
    newUser: "/auth/register",
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          await connectMongoDB();
          const userFromDataBase = await Users.findOne({
            userName: credentials?.userName,
          });

          if (
            await checkPassword(
              credentials?.password || "",
              userFromDataBase.password
            )
          ) {
            // Any object returned will be saved in `user` property of the JWT
            return {
              name: userFromDataBase?.userName,
              email: userFromDataBase?.email,
              watchlist: userFromDataBase?.watchlist,
              favourites: userFromDataBase?.favourites,
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Error finding users:", error); // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

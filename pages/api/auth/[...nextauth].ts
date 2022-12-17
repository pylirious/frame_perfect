import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Reddit from "next-auth/providers/reddit";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {getMongoClient} from "../../../lib/mongodb";

const mongoClientPromise = getMongoClient()
export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Reddit({
            clientId: process.env.REDDIT_ID,
            clientSecret: process.env.REDDIT_SECRET
        }),
        Discord({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
}

export default NextAuth(authOptions)

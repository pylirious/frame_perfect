import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Reddit from "next-auth/providers/reddit";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Reddit({
            clientId: process.env.REDDIT_ID,
            clientSecret: process.env.REDDIT_SECRET
        })
    ],
}

export default NextAuth(authOptions)

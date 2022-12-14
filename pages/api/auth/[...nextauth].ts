import NextAuth, {Session} from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Reddit from "next-auth/providers/reddit";
import Discord from "next-auth/providers/discord";
import Google from "next-auth/providers/google";
import prisma from "../../../lib/prisma";
import type {Adapter} from "next-auth/adapters"
import {AdapterUser} from "next-auth/adapters";
import {JWT} from "next-auth/jwt";
import {User} from "next-auth/core/types";

import type {Prisma, PrismaClient} from "@prisma/client"

export function PrismaAdapter(p: PrismaClient): Adapter {
    // @ts-ignore
    return {
        createSession: (data) => p.session.create({data}),
        createUser: (data) => p.user.create({data}),
        createVerificationToken: (data) => p.verificationToken.create({data}),
        deleteSession: (sessionToken) => p.session.delete({where: {sessionToken}}),
        deleteUser: (id) => p.user.delete({where: {id}}),
        async getSessionAndUser(sessionToken) {
            const userAndSession = await p.session.findUnique({
                where: {sessionToken},
                include: {
                    user: {
                        include: {Notification: {orderBy: {created: "desc"}, take: 10}}
                    }
                },
            })
            if (!userAndSession) return null
            const {user, ...session} = userAndSession
            return {user, session}
        },
        getUser: (id) => p.user.findUnique({where: {id}, include: {Notification: true}}),
        async getUserByAccount(provider_providerAccountId) {
            const account = await p.account.findUnique({where: {provider_providerAccountId}, select: {user: true}});
            return account?.user ?? null
        },
        getUserByEmail: (email) => p.user.findFirst({where: {email}, include: {Notification: true}}),
        linkAccount: (data) => p.account.create({data}) as any,
        unlinkAccount: (provider_providerAccountId) => p.account.delete({where: {provider_providerAccountId}}) as any,
        updateSession: (data) =>
            p.session.update({data, where: {sessionToken: data.sessionToken}}),
        updateUser: (data) => p.user.update({where: {id: data.id}, data}),
        async useVerificationToken(identifier_token) {
            try {
                return await p.verificationToken.delete({where: {identifier_token}})
            } catch (error) {
                // If token already used/deleted, just return null
                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                if ((error as Prisma.PrismaClientKnownRequestError).code === "P2025")
                    return null
                throw error
            }
        },
    }
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            id: "github",
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
        Reddit({
            id: "reddit",
            clientId: process.env.REDDIT_ID,
            clientSecret: process.env.REDDIT_SECRET
        }),
        Discord({
            id: "discord",
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        }),
        Google({
            id: "google",
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    callbacks: {
        async session({session, token, user}: {
            session: Session;
            user: User | AdapterUser;
            token: JWT;
        }) {

            session.user.id = user.id;
            session.user.role = user.role;
            session.user.notification = user.Notification
            return session;
        },
    },
}

export default NextAuth(authOptions)

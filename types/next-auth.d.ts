import {DefaultSession} from "next-auth"
import {Notification} from "@prisma/client"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            id: string
            role: "Moderator" | "Runner",
            notification: Notification[]
        } & DefaultSession["user"]
    }
    interface User{
        role: "Moderator" | "Runner",
        Notification: Notification[]
    }
}

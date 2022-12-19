import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {getNotificationsOfUser} from "../../../prisma/Notification";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.id) return res.status(403).json({message: "Unauthorized, please log in!"})
    const notifications = await getNotificationsOfUser(session.user.id)
    res.status(200).json({message: 'Success', notifications})

}

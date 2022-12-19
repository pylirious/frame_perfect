import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {createApproval} from "../../../prisma/Approval";
import {createNotification} from "../../../prisma/Notification";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    const {userId, description, title} = req.body;
    if (!description || !title || !userId) return res.status(400).json({message: "Please fill out all fields."})
    if (!session || !session.user || !session.user.role || (session.user.id !== userId && session.user.role !== "Moderator")) return res.status(403).json({message: "Unauthorized, please log in!"})
    const approval = await createNotification({description, title, userId})

    res.status(200).json({message: 'The run was successfully verified.'})

}

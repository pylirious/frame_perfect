import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {createApproval} from "../../../prisma/Approval";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.role || session.user.role !== "Moderator") return res.status(403).json({message: "Unauthorized, please log in!"})
    const {speedRunId, approvedById} = req.body;
    if (!speedRunId || !approvedById) return res.status(400).json({message: "Please fill out all fields."})
    const approval = await createApproval({speedRunId, approvedById})

    res.status(200).json({message: 'The run was successfully verified.'})

}

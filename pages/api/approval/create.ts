import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {createApproval} from "../../../prisma/Approval";

/**
 * Create an Approval for a Speed-Run. The speedrun will be marked as verified.
 * The method used is POST and only moderators are able to create a new approval.
 * @param req - the request includes a speedRunId and the user that verified it - approvedById
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.role || session.user.role !== "Moderator") return res.status(403).json({message: "Unauthorized, please log in!"})
    const {speedRunId} = req.body;
    if (!speedRunId) return res.status(400).json({message: "Please fill out all fields."})
    const approval = await createApproval({speedRunId, approvedById: session.user.id})

    res.status(200).json({message: 'The run was successfully verified.'})

}

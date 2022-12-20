import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";
import {setUserRole} from "../../prisma/Users";

/**
 * Get all users. For data protection reasons only moderators can access this endpoint
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(400).json({message: "This API Route is GET-only"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(403).json({message: "Unauthorized, please log in!"})
    const {role} = req.body
    if (role !== "Moderator" && role !== "Runner") return res.status(402).json({message: "Please specify the role to be either \"Runner\" or \"Moderator\""})
    await setUserRole(role, session.user.id)
    res.status(200).json({message: `Your role was changed successfully to ${role}\nPlease reload the page for the changes to take effect`})

}


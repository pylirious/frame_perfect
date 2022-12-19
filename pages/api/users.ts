import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../types/Game";
import {getMongoClient} from "../../lib/mongodb";
import {WithId} from "mongodb";
import {Speedrun} from "../../types/Speedrun";
import {SpeedRunsAPI, UsersApi} from "../../types/Api";
import {getSpeedRuns} from "../../prisma/Speedrun";
import {getUsers} from "../../prisma/Users";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "./auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UsersApi>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user || !session.user.role || session.user.role !== "Moderator") return res.status(403).json({message: "Unauthorized, please log in!"})
    let users = await getUsers()
    res.status(200).json({users})

}


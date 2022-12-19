import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {createSpeedRun} from "../../../prisma/Speedrun";
import {getMongoClient} from '../../../lib/mongodb';

/**
 * Creates a new speedrun. The user mus be loggen in so the speedrun can be associated with the current user. A game, time, link and name must be passed via the POST request.
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session || !session.user) return res.status(403).json({message: "Unauthorized, please log in!"})
    const {game, time, link, name} = req.body;
    if (!game || !time || !link || !name) return res.status(400).json({message: "Please fill out all fields."})
    const run = await createSpeedRun({time, link, name, gameId: game, userId: session.user.id})

    res.status(200).json({message: 'The run was registered successfully.'})

}

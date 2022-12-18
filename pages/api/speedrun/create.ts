import type {NextApiRequest, NextApiResponse} from 'next'
import {Speedrun} from "../../../types/Speedrun";
import {getSession} from "next-auth/react";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {getMongoClient} from "../../../lib/mongodb";
import {ObjectId} from "mongodb";
import {createSpeedRun} from "../../../prisma/Speedrun";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    console.log(session);
    if (!session || !session.user) return res.status(403).json({message: "Unauthorized, please log in!"})
    console.log(req.body);
    const {game, time, link, name} = req.body;
    if (!game || !time || !link || !name) return res.status(400).json({message: "Please fill out all fields."})
    const run = await createSpeedRun({time, link, name, gameId: game, userId: session.user.id})
    console.log(run);

    res.status(200).json({message: 'The run was registered successfully.'})

}

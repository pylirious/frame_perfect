import type {NextApiRequest, NextApiResponse} from 'next'
import {Speedrun} from "../../../types/Speedrun";
import {getSession} from "next-auth/react";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {getMongoClient} from "../../../lib/mongodb";
import {ObjectId} from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    console.log(session);
    if (!session) return res.status(403).json({message: "Unauthorized, please log in!"})
    console.log(req.body);
    const {game, time, link, name} = req.body;
    if (!game || !time || !link || !name) return res.status(400).json({message: "Please fill out all fields."})
    const mongoClient = await getMongoClient()
    const gameDoc = await mongoClient.db(process.env.DB_NAME).collection(process.env.GAME_COLLECTION_NAME).findOne({_id: new ObjectId(req.body.game)}).catch(e => {
        console.error(e);
        return res.status(500).json({error: e, message: "The game could not be found."})
    })
    if (!gameDoc) return res.status(404).json({message: "The game you specified could not be found."})

    await mongoClient.db(process.env.DB_NAME).collection(process.env.RUN_COLLECTION_NAME).insertOne({
        game: new ObjectId(game),
        time,
        name,
        link,
        user: session.user
    })

    res.status(200).json({message: 'The run was registered successfully.'})

}

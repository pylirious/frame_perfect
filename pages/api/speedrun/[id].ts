import type {NextApiRequest, NextApiResponse} from 'next'
import {getMongoClient} from "../../../lib/mongodb";
import {WithId} from "mongodb";
import {Speedrun} from "../../../types/Speedrun";
import {SpeedrunId} from "../../../types/Api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedrunId>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    const mongoClient = await getMongoClient()
    let query = await mongoClient.db("FramePerfect").collection<Speedrun>("speedruns").findOne({id: req.query.id})
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({game: query})
}


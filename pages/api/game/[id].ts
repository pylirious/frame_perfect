import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../../models/Game";
import {getMongoClient} from "../../../lib/mongodb";

type ResponseData = {
    message?: string
    game?: Game
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    const db = await getMongoClient()
    let query = await db.db("FramePerfect").collection("games").findOne({id: req.query.id})
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({game: {id: query.id!, name: query.name!, image: query.image}})
}


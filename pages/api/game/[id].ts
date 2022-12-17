import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../../types/Game";
import {getMongoClient} from "../../../lib/mongodb";
import {GameId} from "../../../types/Api";
import {ObjectId} from "mongodb";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GameId>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    const mongoClient = await getMongoClient()
    let query = await mongoClient.db(process.env.DB_NAME).collection<Game>(process.env.GAME_COLLECTION_NAME).findOne({
        $or: [{id: req.query.id}, {_id: new ObjectId(req.query.id.toString())}]
    })
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({game: query})
}


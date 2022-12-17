import {NextApiRequest, NextApiResponse} from "next";
import {SpeedrunGameId} from "../../../../types/Api";
import {getMongoClient} from "../../../../lib/mongodb";
import {Speedrun} from "../../../../types/Speedrun";
import {ObjectId} from "mongodb";
import {Game} from "../../../../types/Game";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedrunGameId>
) {
    if (req.method !== "GET") return res.status(405).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    const mongoClient = await getMongoClient()

    let query = await mongoClient.db(process.env.DB_NAME).collection<Speedrun>(process.env.RUN_COLLECTION_NAME).find({game: new ObjectId(req.query.id.toString())}).toArray()
    query.sort((a, b) => {
        return a.time - b.time
    })
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({speedRuns: query})
}


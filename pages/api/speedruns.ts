import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../types/Game";
import {getMongoClient} from "../../lib/mongodb";
import {WithId} from "mongodb";
import {Speedrun} from "../../types/Speedrun";
import {SpeedRunsAPI} from "../../types/Api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedRunsAPI>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    let speedRuns = await getSpeedRuns()
    if (!speedRuns)
        res.status(200).json({speedRuns: []})
    else
        res.status(200).json({speedRuns})
}

const getSpeedRuns: () => Promise<WithId<Speedrun>[]> = async () => {
    const mongoClient = await getMongoClient()
    return await mongoClient.db(process.env.DB_NAME).collection<Speedrun>(process.env.RUN_COLLECTION_NAME).find().toArray()

}

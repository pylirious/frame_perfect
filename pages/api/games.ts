import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../types/Game";
import {getMongoClient} from "../../lib/mongodb";
import {WithId} from "mongodb";

type ResponseData = {
    message?: string
    games?: WithId<Game>[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    let games = await getGames()
    res.status(200).json({games})
}

const getGames: () => Promise<WithId<Game>[]> = async () => {
    const mongoClient = await getMongoClient()
    return  await mongoClient.db("FramePerfect").collection<Game>(process.env.GAME_COLLECTION_NAME).find().toArray()

}

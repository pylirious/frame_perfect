import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../models/Game";
import {getMongoClient} from "../../lib/mongodb";

type ResponseData = {
    message?: string
    games?: Game[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    let games = await getGames()
    res.status(200).json({games})
}

const getGames = async () => {
    const db = await getMongoClient()
    let games= await db.db("FramePerfect").collection("games").find().toArray()
    return games.map((game) => ({name: game.name!, id: game.id!, image: game.image}));
}

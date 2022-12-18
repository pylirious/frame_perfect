import type {NextApiRequest, NextApiResponse} from 'next'
import {SpeedrunId} from "../../../types/Api";
import {getSpeedRunByID} from "../../../prisma/Speedrun";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedrunId>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    let query = await getSpeedRunByID(req.query.id.toString())
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({speedRun: query})
}


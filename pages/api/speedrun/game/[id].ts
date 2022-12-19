import {NextApiRequest, NextApiResponse} from "next";
import {SpeedrunGameId} from "../../../../types/Api";
import {getSpeedRunsByGame} from "../../../../prisma/Speedrun";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedrunGameId>
) {
    if (req.method !== "GET") return res.status(405).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    let query = await getSpeedRunsByGame(req.query.id.toString())
    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({speedRuns: query})
}


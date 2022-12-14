import type {NextApiRequest, NextApiResponse} from 'next'
import {SpeedRunsAPI} from "../../types/Api";
import {getSpeedRuns} from "../../prisma/Speedrun";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<SpeedRunsAPI>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    let speedRuns = await getSpeedRuns()
    res.status(200).json({speedRuns})

}


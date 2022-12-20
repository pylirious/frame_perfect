import type {NextApiRequest, NextApiResponse} from 'next'
import {SpeedrunId} from "../../../types/Api";
import {deleteSpeedRunByID, getSpeedRunByID} from "../../../prisma/Speedrun";

/**
 * Gets or deletes a speed-run by the id given in the query. When getting a speed-run the whole User, Game and Approval object is returned.
 * @param req
 * @param res
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<SpeedrunId>) {
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    if (req.method === "GET") {
        let query = await getSpeedRunByID(req.query.id.toString())
        if (!query) return res.status(404).json({message: "Game not found"});
        res.status(200).json({speedRun: query})
    } else if (req.method === "DELETE") {
        let query = await deleteSpeedRunByID(req.query.id.toString())
        res.status(200).json({message: "Speedrun delete successfully."})
    } else {
        return res.status(405).json({message: "This API Route is GET/DELETE-only"})
    }
}


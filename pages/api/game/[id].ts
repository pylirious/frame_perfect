import type {NextApiRequest, NextApiResponse} from 'next'
import {Game} from "../../../types/Game";
import {getMongoClient} from "../../../lib/mongodb";
import {GameId} from "../../../types/Api";
import {ObjectId} from "mongodb";
import {getGameByID, getGameByName} from "../../../prisma/Game";

/**
 * This is the API endpoint handling the requests at /api/games/[id] where [id] is the id of the game.
 * the [id] can be accessed via the req#query#id parameter. The function checks for the right type of request and if an
 * [id] was specified
 * @typedef {import('next').NextApiRequest}
 * @typedef {import('next').NextApiResponse}
 * @typedef {import('../../../types/Api').GameId} GameId
 * @param {NextApiRequest} req - The request sent to the API
 * @param {NextApiResponse<GameId>} res - The response sent by the API
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<GameId>
) {
    if (req.method !== "GET") return res.status(400).json({message: "This API Route is GET-only"})
    if (!req.query.id) return res.status(400).json({message: "Please specify an id"})
    let query;
    query = await getGameByName(req.query.id.toString())
    if (!query)
            query = await getGameByID(req.query.id.toString())

    if (!query) return res.status(404).json({message: "Game not found"});
    res.status(200).json({game: query})
}


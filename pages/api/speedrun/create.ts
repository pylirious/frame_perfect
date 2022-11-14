import type {NextApiRequest, NextApiResponse} from 'next'
import {Speedrun} from "../../../models/Speedrun";
import {getSession} from "next-auth/react";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({req})
    if (!session || !session.user || !session.user.email) return res.status(403)

    if (req.method !== "POST") res.status(400)
    res.status(200).json({name: 'John Doe'})
}

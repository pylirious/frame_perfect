import type {NextApiRequest, NextApiResponse} from 'next'
import {Speedrun} from "../../../types/Speedrun";
import {getSession} from "next-auth/react";
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await unstable_getServerSession(req, res, authOptions)
    console.log(session);
    if (!session) return res.status(403).json({message:"Unauthorized"})
    console.log(req);
    if (req.method !== "POST") return res.status(400).json({message:"Wrong Method"})
    res.status(200).json({name: 'John Doe'})

}

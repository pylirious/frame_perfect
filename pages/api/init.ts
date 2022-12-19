import type {NextApiRequest, NextApiResponse} from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // await initGames()
    res.status(200).json({message: 'Success'})

}

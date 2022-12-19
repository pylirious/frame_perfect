import type {NextApiRequest, NextApiResponse} from 'next'
import {unstable_getServerSession} from "next-auth";
import {authOptions} from "../auth/[...nextauth]";
import {getNotificationByID, getNotificationsOfUser, markNotificationAsRead} from "../../../prisma/Notification";

/**
 * Marks a notification as read. Only moderators may mark notifications of other users as read.
 *
 * @param req
 * @param res
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") return res.status(405).json({message: "Wrong Method"})
    const session = await unstable_getServerSession(req, res, authOptions)
    const {id} = req.body;
    if (!id) return res.status(400).json({message: "Please provide the notification id"})
    const notification = await getNotificationByID(id.toString())
    if (!notification) return res.status(404).json({message: "Notification not found."})
    if (!session || !session.user || !session.user.role || (session.user.id !== notification.userId && session.user.role !== "Moderator")) return res.status(403).json({message: "Unauthorized, please log in!"})
    await markNotificationAsRead(id.toString())
    const notifications = await getNotificationsOfUser(notification.userId)
    res.status(200).json({message: 'Success', notifications})

}

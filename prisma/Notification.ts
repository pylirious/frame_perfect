import prisma from "../lib/prisma";

export const getNotificationByID = async (id: string) => {
    return await prisma.notification.findUnique({
        where: {id: id},
    })
}

export const createNotification = async (notification: { description: string, title: string, userId: string }) => {
    return await prisma.notification.create({
        data: notification
    })
}


export const markNotificationAsRead = async (id: string) => {
    const notification = await getNotificationByID(id)
    if (!notification) return;
    notification.read = true
    return await prisma.notification.update({
        where: {id: id},
        data: notification
    })
}
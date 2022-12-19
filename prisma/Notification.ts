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
    return await prisma.notification.update({
        where: {id: id},
        data: {read: true}
    })
}
export const getNotificationsOfUser = async (id: string) => {
    return await prisma.notification.findMany({
        take: 5,
        where: {userId: id},
        orderBy: {created: "desc"},
        include: {user: true}
    })
}
import prisma from "../lib/prisma";

export const getSpeedRunByID = async (id: string) => {
    return await prisma.speedrun.findUnique({
        where: {id: id},
        include: {user: true, game: true, Approval: true}
    })
}

export const deleteSpeedRunByID = async (id: string) => {
    return await prisma.speedrun.delete({
        where: {id: id},
    })
}

export const getSpeedRunsByGame = async (id: string) => {
    return await prisma.speedrun.findMany({
        where: {
            gameId: id,
        },
        include: {user: true, game: true, Approval: true},
        orderBy: {
            time: "asc"
        }
    })
}

export const getSpeedRuns = async () => {
    return await prisma.speedrun.findMany({include: {Approval: true, user: {select: {name: true, id: true}}}})
}


export const createSpeedRun = async (speedRun: {
    userId: string
    gameId: string
    time: number
    name: string
    link: string
}) => {
    return await prisma.speedrun.create({
        data: speedRun
    })
}

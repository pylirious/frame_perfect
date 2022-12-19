import prisma from "../lib/prisma";

export const getGameByID = async (id: string) => {
    return await prisma.game.findUnique({
        where: {identifier: id},
        include: {Speedrun: {include: {user: true, Approval: true}}}
    })
}

export const getGames = async () => {
    return await prisma.game.findMany()
}

export const getGameByName = async (id: string) => {
    return await prisma.game.findUnique({
        where: {id: id},
        include: {Speedrun: {include: {user: true, Approval: true}}}
    })
}

export const createGame = async (game: { name: string, id: string, image: string, }) => {
    return await prisma.game.create({
        data: game
    })
}

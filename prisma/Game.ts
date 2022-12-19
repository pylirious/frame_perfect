import prisma from "../lib/prisma";
import {Game} from "../types/Game";

export const getGameByID = async (id: string) => {
    return await prisma.game.findUnique({
        where: {identifier: id}
    })
}

export const getGames = async () => {
    return await prisma.game.findMany()
}

export const getGameByName = async (id: string) => {
    return await prisma.game.findUnique({
        where: {id: id}
    })
}

export const createGame = async (game: Game) => {
    return await prisma.game.create({
        data: game
    })
}

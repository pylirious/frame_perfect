import prisma from "../lib/prisma";
import {Game} from "../types/Game";
import {Speedrun} from "@prisma/client";

export const getSpeedRunByID = async (id: string) => {
    return await prisma.speedrun.findUnique({
        where: {id: id},
        include: {user: true, game:true}
    })
}

export const getSpeedRunsByGame = async (id: string) => {
    return await prisma.speedrun.findMany({
        where: {gameId: id},
        include: {user: true, game:true},
        orderBy: {
            time: "asc"
        }
    })
}

export const getSpeedRuns = async () => {
    return await prisma.speedrun.findMany({include: {user: true}})
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

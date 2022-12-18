import {Game} from "./Game";
import {User} from "next-auth";
import {ObjectId} from "mongodb";
import {Prisma} from "@prisma/client"


const speedRunWithUser = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {user: true},
})

const speedRunWithUserAndGame = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {user: true, game: true},
})

export type Speedrun = Prisma.SpeedrunGetPayload<typeof speedRunWithUser>
export type SpeedrunWithUserAndGame = Prisma.SpeedrunGetPayload<typeof speedRunWithUserAndGame>

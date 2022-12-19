import {Prisma} from "@prisma/client"


const speedRunWithUser = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {user: true},
})
const speedRunWithUserNameAndApproval = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {Approval: true, user: {select: {name: true, id: true}}},
})

const speedRunWithUserAndGame = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {user: true, game: true},
})

const speedRunWithUserAndApproval = Prisma.validator<Prisma.SpeedrunArgs>()({
    include: {user: true, game: true, Approval: true},
})

export type Speedrun = Prisma.SpeedrunGetPayload<typeof speedRunWithUser>
export type SpeedrunWithUserNameAndApproval = Prisma.SpeedrunGetPayload<typeof speedRunWithUserNameAndApproval>
export type SpeedrunWithUserAndGame = Prisma.SpeedrunGetPayload<typeof speedRunWithUserAndGame>
export type SpeedRunWithUserGameAndApproval = Prisma.SpeedrunGetPayload<typeof speedRunWithUserAndApproval>

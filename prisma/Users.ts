import prisma from "../lib/prisma";

export const getUsers = async () => {
    return await prisma.user.findMany()
}
export const setUserRole = async (role: ("Moderator" | "Runner"), userId: string) => {
    return await prisma.user.update({where: {id: userId}, data: {role}},)
}


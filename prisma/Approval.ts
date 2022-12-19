import prisma from "../lib/prisma";

export const createApproval = async (approval: { approvedById: string, speedRunId: string }) => {
    return await prisma.approval.create({
        data: {
            approvedById: approval.approvedById,
            speedRunId: approval.speedRunId
        }
    })
}
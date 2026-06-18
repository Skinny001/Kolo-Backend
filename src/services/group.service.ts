import { prisma } from '../lib/prisma';

export class GroupService {
    public async createGroup(userId: string, name: string, amount: number, frequency: string) {
        return await prisma.savingsGroup.create({
            data: {
                name,
                contributionAmount: amount,
                contributionFrequency: frequency,
                members: {
                    create: {
                        userId: userId,
                        role: 'CREATOR'
                    }
                }
            }
        });
    }

    public async joinGroup(userId: string, groupId: string) {
        return await prisma.groupMember.create({
            data: {
                userId,
                groupId,
                role: 'MEMBER'
            }
        });
    }

    public async getGroupStatus(userId: string) {
        return await prisma.groupMember.findMany({
            where: { userId },
            include: {
                group: {
                    include: { members: { include: { user: true } } }
                }
            }
        });
    }

    public async addContribution(userId: string, groupId: string, amount: number, txHash: string) {
        return await prisma.contribution.create({
            data: {
                userId,
                groupId,
                amount,
                transactionHash: txHash,
                status: 'COMPLETED'
            }
        });
    }
}

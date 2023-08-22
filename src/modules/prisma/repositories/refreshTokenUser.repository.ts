
import { QueryInfoPrismaDto } from '@decorators/queryInfoPrisma/queryInfoPisma.dto';
import { PrismaRepository, PrismaTransaction } from '@modules/prisma/repositories/prisma.repository';
import { Injectable } from '@nestjs/common';
import { RefreshTokenUser, Prisma } from '@prisma/client';

@Injectable()
export class RefreshTokenUserRepository {
    constructor(private prisma: PrismaRepository) { }


    async findAndCountAll(query?: QueryInfoPrismaDto): Promise<{
        row: RefreshTokenUser[];
        count: number;
    }> {
        const [row, count] = await this.prisma.$transaction([
            this.prisma.refreshTokenUser.findMany(query),
            this.prisma.refreshTokenUser.count({
                where: query?.where,
            }),
        ]);
        return {
            row,
            count,
        };
    }
    async upsertById(
        refreshTokenUserCreateInput: Prisma.RefreshTokenUserCreateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser> {
        let refreshTokenUser = await tx.refreshTokenUser.findFirst({ where: { id: refreshTokenUserCreateInput.id!! } });
        if (!refreshTokenUser) {
            refreshTokenUser = await tx.refreshTokenUser.create({
                data: refreshTokenUserCreateInput,
            });
        } else {
            refreshTokenUser = await tx.refreshTokenUser.update({
                where: {
                    id: refreshTokenUserCreateInput.id!!,
                },
                data: refreshTokenUserCreateInput,
            });
        }
        return refreshTokenUser;
    }

    async updateById(
        id: string,
        refreshTokenUserUpdateInput: Prisma.RefreshTokenUserUpdateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser> {
        return await tx.refreshTokenUser.update({
            data: refreshTokenUserUpdateInput,
            where: { id },
        });
    }

    async updateMany(
        refreshTokenUserUpdateInput: Prisma.RefreshTokenUserUpdateInput,
        query: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<Prisma.PrismaPromise<Prisma.BatchPayload>> {
        return await tx.refreshTokenUser.updateMany({
            data: refreshTokenUserUpdateInput,
            where: query.where,
        });
    }

    async create(
        refreshTokenUserCreateInput: Prisma.RefreshTokenUserCreateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser> {
        return await tx.refreshTokenUser.create({ data: refreshTokenUserCreateInput });
    }

    async findOne(
        query?: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser | null> {
        return await tx.refreshTokenUser.findFirst(query);
    }

    async findMany(
        query?: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser[]> {

        return await tx.refreshTokenUser.findMany(query);
    }

    async deleteById(
        id: string,
        tx: PrismaTransaction = this.prisma
    ): Promise<RefreshTokenUser> {
        return await tx.refreshTokenUser.delete({ where: { id } });
    }

    async deleteMany(
        refreshTokenUserWhereInput: Prisma.RefreshTokenUserWhereInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<Prisma.BatchPayload> {
        return await tx.refreshTokenUser.deleteMany({ where: refreshTokenUserWhereInput });
    }


    async findOneByUserId(userId: string): Promise<RefreshTokenUser | null> {
        return await this.prisma.refreshTokenUser.findFirst({ where: { userId } })
    }

    async findOneByRefreshToken(refreshToken: string): Promise<RefreshTokenUser | null> {
        return await this.prisma.refreshTokenUser.findFirst({ where: { refreshToken } })
    }

    async updateByUserId(userId: string, refreshTokenUserUpdateInput: Prisma.RefreshTokenUserUpdateInput, tx: PrismaTransaction = this.prisma): Promise<RefreshTokenUser> {
        return await tx.refreshTokenUser.update({
            data: refreshTokenUserUpdateInput,
            where: {
                userId
            }
        })
    }
}
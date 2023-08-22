
import { QueryInfoPrismaDto } from '@decorators/queryInfoPrisma/queryInfoPisma.dto';
import { PrismaRepository, PrismaTransaction } from '@modules/prisma/repositories/prisma.repository';
import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaRepository) { }


    async findAndCountAll(query?: QueryInfoPrismaDto): Promise<{
        row: User[];
        count: number;
    }> {
        const [row, count] = await this.prisma.$transaction([
            this.prisma.user.findMany(query),
            this.prisma.user.count({
                where: query?.where,
            }),
        ]);
        return {
            row,
            count,
        };
    }
    async upsertById(
        userCreateInput: Prisma.UserCreateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<User> {
        let user = await tx.user.findFirst({ where: { id: userCreateInput.id!! } });
        if (!user) {
            user = await tx.user.create({
                data: userCreateInput,
            });
        } else {
            user = await tx.user.update({
                where: {
                    id: userCreateInput.id!!,
                },
                data: userCreateInput,
            });
        }
        return user;
    }

    async updateById(
        id: string,
        userUpdateInput: Prisma.UserUpdateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<User> {
        return await tx.user.update({
            data: userUpdateInput,
            where: { id },
        });
    }

    async updateMany(
        userUpdateInput: Prisma.UserUpdateInput,
        query: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<Prisma.PrismaPromise<Prisma.BatchPayload>> {
        return await tx.user.updateMany({
            data: userUpdateInput,
            where: query.where,
        });
    }

    async create(
        userCreateInput: Prisma.UserCreateInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<User> {
        return await tx.user.create({ data: userCreateInput });
    }

    async findOne(
        query?: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<User | null> {
        return await tx.user.findFirst(query);
    }

    async findMany(
        query?: QueryInfoPrismaDto,
        tx: PrismaTransaction = this.prisma
    ): Promise<User[]> {

        return await tx.user.findMany(query);
    }

    async deleteById(
        id: string,
        tx: PrismaTransaction = this.prisma
    ): Promise<User> {
        return await tx.user.delete({ where: { id } });
    }

    async deleteMany(
        userWhereInput: Prisma.UserWhereInput,
        tx: PrismaTransaction = this.prisma
    ): Promise<Prisma.BatchPayload> {
        return await tx.user.deleteMany({ where: userWhereInput });
    }



    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findFirst({ where: { email } });
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.prisma.user.findFirst({ where: { username } });
    }
}
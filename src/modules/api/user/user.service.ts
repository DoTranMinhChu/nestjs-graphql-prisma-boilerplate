
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../prisma/repositories/user.repository';
import { QueryInfoPrismaDto } from '@decorators/queryInfoPrisma/queryInfoPisma.dto';


@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async findAndCountAll(queryInfo: QueryInfoPrismaDto) {
        return await this.userRepository.findAndCountAll(queryInfo);
    }

    async findOne(queryInfo: QueryInfoPrismaDto) {
        return await this.userRepository.findOne(queryInfo);
    }
}
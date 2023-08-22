import * as bcrypt from 'bcrypt';

export class BcryptUtil {
    static async hashData(data: string, saltRounds: number = 10): Promise<string> {
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data, salt);
    }

    static async compareDataWithHash(data: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(data, hash)
    }
}

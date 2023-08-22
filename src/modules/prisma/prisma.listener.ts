import { Injectable } from '@nestjs/common';


@Injectable()
export class PrismaListener {
    static async on(params: any, next: any) {
        if (params.action == "count" || params.action.includes("find")) {
            if (params.args == undefined) {
                params.args = {
                    where: {
                        deletedAt: null,
                    },
                };
            } else {
                params.args["where"] = { ...params.args["where"], deletedAt: null };
            }
        }
        if (params.action == "delete") {
            // Delete queries
            // Change action to an update
            params.action = "update";
            params.args["data"] = { deletedAt: new Date() };
        }
        if (params.action == "deleteMany") {
            // Delete many queries
            params.action = "updateMany";
            if (params.args.data != undefined) {
                params.args.data["deletedAt"] = new Date();
            } else {
                params.args["data"] = { deletedAt: new Date() };
            }
        }

        return next(params);
    }
}
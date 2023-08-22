
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as _ from 'lodash';
export const UNLIMITED = 'unlimited'
@Injectable()
export class QueryPrismaMiddleware implements NestMiddleware {
    async use(req: any | Request, _res: Response, next: NextFunction) {
        const where = this._parsewhere(req);
        const orderBy = this._parseOrder(req);
        const page = typeof req?.query["page"] == "string" ? Number.parseInt(req?.query["page"]) : 1
        const take = req.query['limit'] == UNLIMITED ? UNLIMITED : typeof req.query['limit'] == "string" ? Number.parseInt(req.query['limit']) : 50

        const skip = take == UNLIMITED ? undefined : parseInt(`${req.query['offset']}`) || (page - 1) * take;
        const select = this._parseSelects(req);

        // if (fields.attributes != undefined) {
        //   fields.attributes = _.union(['id', 'created_at', 'updated_at'], fields.attributes);
        // }
        req.queryInfoPrisma = _.merge(
            {
                where,
                orderBy,
                take: take == UNLIMITED ? undefined : take,
                skip
            },
            select
        );

        next();
    }
    /**
     * where param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */
    _parsewhere(req: any): any {
        let where = req.query['where'];
        try {
            where = JSON.parse(where);
        } catch (ignore) {
            where = undefined;
        }
        return where || {};
    }
    /**
     * Where param only accept <and> query. <or> will be supported later
     * Format: [[key, operator, value], [key, operator, value]]
     */

    _parseWhere(req: any): any {
        let where = req.query['where'];

        try {
            where = JSON.parse(where);
        } catch (ignore) {
            where = undefined;
        }
        return where || {};
    }
    /**
     * Format: [[key, order], [key, order]]
     */
    _parseOrder(req: any): any {
        let order = req.query['order'];
        try {
            order = JSON.parse(order);
        } catch (ignore) {
            order = undefined;
        }
        return order || [{ 'updatedAt': 'asc' }];
    }
    _parseSelects(req: any): any {
        let select = req.query['select'];
        try {
            select = JSON.parse(select);
        } catch (ignore) {
            select = [];
        }
        try {
            return this._parseAttribute(select);
        } catch (err) {
            return null;
        }
    }
    _parseAttribute(attrs: any) {
        if (typeof attrs == 'string')
            attrs = JSON.parse(attrs)
        let select: any = { 'id': true, 'createdAt': true, 'updatedAt': true }
        const includes: any = [];
        let isGetAll = false;
        let isSetParanoid = false;
        let where: any = undefined;
        _.forEach(attrs, (f) => {

            if (typeof f === 'string') {
                switch (f) {
                    case '$all':
                        isGetAll = true;
                        select = undefined;
                        break;
                    case '$paranoid':
                        isSetParanoid = true;
                        break;
                    default:
                        select[f] = true;
                }


            } else if (typeof f === 'object' && !Array.isArray(f)) {
                _.forEach(
                    f,
                    ((value: any, name: string) => {
                        switch (name) {
                            case '$where':
                                where = _.merge({}, where, value);
                                break;
                            default:
                                includes.push({
                                    [name]: value,
                                });

                        }


                    }).bind(this)
                );
            }
        });
        let include = this._parseInclude(includes);
        include = Object.keys(include).length === 0 ? undefined : include
        const result: any = {
            include: include
        };
        if (where) result.where = where;
        if (!isGetAll) {
            result.select = select;
        }
        if (isSetParanoid) {
            result.paranoid = false;
        }
        // if (result.select == undefined) {
        //     result.select = { exclude: ['password'] }
        // } else {
        //     result.select = result.select.filter((e: string) => e !== 'password')
        // }
        return result;
    }

    _parseInclude(includes: any) {
        if (includes.length === 0) return includes;

        let include: any = {};
        _.forEach(
            includes,
            ((i: any) => {
                _.forEach(
                    i,
                    ((attrs: any, name: string) => {
                        const att = this._parseAttribute(attrs);
                        const associate = Object.assign(
                            {

                                [name]: { ...att }

                            }
                        );
                        include = {
                            ...include,
                            ...associate
                        }
                    }).bind(this)
                );
            }).bind(this)
        );
        return include;
    }
}
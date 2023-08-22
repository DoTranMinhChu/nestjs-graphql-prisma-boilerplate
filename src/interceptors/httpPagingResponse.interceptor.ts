import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const UNLIMITED = "UNLIMITED"
@Injectable()
export class HttpPagingResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // Use 'next' to continue the execution chain and get the original response as an Observable
        const request = context.switchToHttp().getRequest();


        return next.handle().pipe(
            map((data) => {
                if (data.toJSON) {
                    data = data.toJSON();
                }
                const queryPage = request.query["page"];
                const queryLimit = request.query["limit"];
                const page = typeof queryPage == "string" ? Number.parseInt(queryPage) : 1;
                const currentPage = page;
                const nextPage = page + 1;
                const prevPage = page - 1;
                const limit =
                    queryLimit == UNLIMITED
                        ? UNLIMITED
                        : typeof queryLimit == "string"
                            ? Number.parseInt(queryLimit)
                            : 50;


                // Modify the response or create a custom response here
                const isArray = Array.isArray(data) ? true : false;
                const dataResponse = isArray ? {
                    row: [...data]
                } : Object.assign(
                    data
                )
                const customResponse = {
                    ...dataResponse,
                    pagination: {
                        currentPage,
                        nextPage,
                        prevPage,
                        limit
                    },
                }
                return customResponse;
            }),
        );
    }
}

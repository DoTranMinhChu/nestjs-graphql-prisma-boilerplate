// custom-response.decorator.ts
import { HttpPagingResponseInterceptor } from '@interceptors/httpPagingResponse.interceptor';
import { UseInterceptors } from '@nestjs/common';


export function HttpPagingResponse() {
    return UseInterceptors(HttpPagingResponseInterceptor);
}

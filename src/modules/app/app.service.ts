import { InternalServerErrorException } from '@exceptions/internalServerError.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  main() {
    return `
    <a href="/openapi">OpenAPI</a>
    </br>
    <a href="/graphql">GraphQL</a>
    `;
  }

  getInternalServerErrorException() {
    throw new InternalServerErrorException();
  }
}

import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { configSwagger } from '@swagger/swagger.config';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { AppModule } from '@modules/app/app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "*"
    }
  });
  // ================ [START] Swagger setup [START] ================

  const document = SwaggerModule.createDocument(app, configSwagger, {

  });


  SwaggerModule.setup('openapi', app, document, {
    swaggerOptions: {
      operationsSorter: function (a: any, b: any) {
        var order: any = { 'get': '0', 'post': '1', 'put': '2', 'delete': '3' };
        return order[a.get("method")].localeCompare(order[b.get("method")]);
      },
      apisSorter: "alpha",
    },
  });

  const yamlString = yaml.dump(document, { skipInvalid: true });

  try {
    fs.writeFileSync('./swagger.yml', yamlString, 'utf8');
    console.log('Swagger documentation exported to swagger.yaml');
  } catch (err) {
    console.error('Error exporting Swagger documentation:', err);
  }
  // ================ [END] Swagger setup [END] ================


  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(+configService.get('server.port'));

  Logger.log(`http://localhost:${configService.get('server.port')}/openapi`)

}
bootstrap();

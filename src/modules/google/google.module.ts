import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { ConfigModule } from '@nestjs/config';


@Module({
    imports: [ConfigModule],
    controllers: [],
    providers: [GoogleService],
    exports: [GoogleService],
})
export class GoogleModule { }
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { HttpService } from './http/http.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, UserService, HttpService],
})
export class AppModule {}

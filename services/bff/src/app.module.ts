import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { HttpService } from './http/http.service';
import { PostCommentService } from './post-comment/post-comment.service';
import { PostService } from './post/post.service';

@Module({
	imports: [],
	controllers: [AppController],
	providers: [AppService, UserService, HttpService, PostCommentService, PostService],
})
export class AppModule {}

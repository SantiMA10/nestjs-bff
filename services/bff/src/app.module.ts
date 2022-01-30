import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostCommentService } from './post-comment/post-comment.service';
import { UserService } from './user/user.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development',
		}),
	],
	controllers: [PostController],
	providers: [UserService, PostCommentService, PostService],
})
export class AppModule {}

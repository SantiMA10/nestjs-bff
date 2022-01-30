import { Module } from '@nestjs/common';

import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { PostCommentService } from './post-comment/post-comment.service';
import { UserService } from './user/user.service';

@Module({
	imports: [],
	controllers: [PostController],
	providers: [UserService, PostCommentService, PostService],
})
export class AppModule {}

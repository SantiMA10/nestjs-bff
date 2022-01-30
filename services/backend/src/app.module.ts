import { Module } from '@nestjs/common';

import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

@Module({
	imports: [],
	controllers: [PostController],
	providers: [PostService],
})
export class AppModule {}

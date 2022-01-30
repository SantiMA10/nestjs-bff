import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { Post } from './post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get(':postId')
	public async findById(
		@Res({ passthrough: true }) res: Response,
		@Param('postId') postId: Post['id'],
	) {
		const post = await this.postService.findById(postId);

		if (!post) {
			res.status(HttpStatus.NOT_FOUND);
			return {};
		}

		res.status(HttpStatus.OK);
		return post;
	}
}

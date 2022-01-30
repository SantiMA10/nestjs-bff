import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { PostCommentService } from '../post-comment/post-comment.service';
import { UserService } from '../user/user.service';
import { Post } from './post.interface';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
	constructor(
		private readonly postService: PostService,
		private readonly userService: UserService,
		private readonly postCommentService: PostCommentService,
	) {}

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

		const user = await this.userService.findById(post.userId);
		if (!user) {
			res.status(HttpStatus.NOT_FOUND);
			return {};
		}

		const comments = await this.postCommentService.findByPostId(postId);

		res.status(HttpStatus.OK);
		return { ...post, user, comments };
	}
}

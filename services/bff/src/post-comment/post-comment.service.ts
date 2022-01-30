import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { PostComment } from './post-comment.interface';

@Injectable()
export class PostCommentService {
	public async findByPostId(postId: PostComment['postId']): Promise<PostComment[]> {
		const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);

		return response.json();
	}
}

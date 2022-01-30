import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { Post } from './post.interface';

@Injectable()
export class PostService {
	public async findById(postId: Post['id']): Promise<Post> {
		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);

		if (response.status === 404) {
			return undefined;
		}

		return response.json();
	}

	// TODO: missing CRUD methods
}

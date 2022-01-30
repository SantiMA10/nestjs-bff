import * as nock from 'nock';

import { Post } from '../../../src/post/post.interface';
import { PostComment } from '../../../src/post-comment/post-comment.interface';

export const mockPostCommentForPostIdFoundRequest = (
	postId: Post['id'],
	comments: PostComment[],
) => {
	return nock('https://jsonplaceholder.typicode.com')
		.get('/comments')
		.query({ postId })
		.reply(200, comments);
};

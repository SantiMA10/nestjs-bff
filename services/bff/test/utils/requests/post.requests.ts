import * as nock from 'nock';

import { Post } from '../../../src/post/post.interface';

export const mockPostNotFoundRequest = (postId: Post['id']) => {
	return nock(process.env.BACKEND_HOST).get(`/posts/${postId}`).reply(404, {});
};

export const mockPostFoundRequest = (post: Post) => {
	return nock(process.env.BACKEND_HOST).get(`/posts/${post.id}`).reply(200, post);
};

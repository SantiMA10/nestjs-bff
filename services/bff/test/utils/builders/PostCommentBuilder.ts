import * as Factory from 'factory.ts';

import { PostComment } from '../../../src/post-comment/post-comment.interface';

export const PostCommentBuilder = Factory.Sync.makeFactory<PostComment>({
	id: Factory.each((i) => i),
	postId: Factory.each((i) => i),
	name: 'id labore ex et quam laborum',
	email: 'Eliseo@gardner.biz',
	body: `laudantium enim quasi est quidem magnam voluptate ipsam eos
tempora quo necessitatibus
dolor quam autem quasi
reiciendis et nam sapiente accusantium`,
});

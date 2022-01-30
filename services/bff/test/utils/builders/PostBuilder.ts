import * as Factory from 'factory.ts';

import { Post } from '../../../src/post/post.interface';

export const PostBuilder = Factory.Sync.makeFactory<Post>({
	id: Factory.each((i) => i),
	userId: Factory.each((i) => i),
	title: 'id labore ex et quam laborum',
	body: `laudantium enim quasi est quidem magnam voluptate ipsam eos
tempora quo necessitatibus
dolor quam autem quasi
reiciendis et nam sapiente accusantium`,
});

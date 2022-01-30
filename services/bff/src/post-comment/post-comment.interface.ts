import { Post } from '../post/post.interface';

export interface PostComment {
	postId: Post['id'];
	id: number;
	name: string;
	email: string;
	body: string;
}

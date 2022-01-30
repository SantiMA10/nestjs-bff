import { User } from '../user/user.interface';

export interface Post {
	userId: User['id'];
	id: number;
	title: string;
	body: string;
}

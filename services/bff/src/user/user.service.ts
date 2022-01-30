import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

import { User } from './user.interface';

@Injectable()
export class UserService {
	public async findById(userId: User['id']): Promise<User> {
		const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);

		if (response.status === 404) {
			return undefined;
		}

		return response.json();
	}
}

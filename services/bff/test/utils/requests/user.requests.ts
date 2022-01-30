import * as nock from 'nock';

import { User } from '../../../src/user/user.interface';

export const mockUserNotFoundRequest = (userId: User['id']) => {
	return nock('https://jsonplaceholder.typicode.com').get(`/users/${userId}`).reply(404, {});
};

export const mockUserFoundRequest = (user: User) => {
	return nock('https://jsonplaceholder.typicode.com').get(`/users/${user.id}`).reply(200, user);
};

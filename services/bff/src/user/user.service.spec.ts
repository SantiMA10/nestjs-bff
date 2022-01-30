import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';

import { UserBuilder } from '../../test/utils/builders/UserBuilder';
import { UserService } from './user.service';

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#findById', () => {
		beforeEach(() => {
			nock.cleanAll();
		});

		it('returns the undefined if the user cannot be found', async () => {
			nock('https://jsonplaceholder.typicode.com').get(`/users/-1`).reply(404, {});
			const response = await service.findById(-1);

			expect(response).toBeUndefined();
		});

		it('returns the User if the user exists', async () => {
			const user = UserBuilder.build();
			nock('https://jsonplaceholder.typicode.com').get(`/users/${user.id}`).reply(200, user);

			const response = await service.findById(user.id);

			expect(response).toStrictEqual(user);
		});
	});
});

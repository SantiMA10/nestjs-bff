import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';

import { PostBuilder } from '../../test/utils/builders/PostBuilder';
import {
	mockPostFoundRequest,
	mockPostNotFoundRequest,
} from '../../test/utils/requests/post.requests';
import { PostService } from './post.service';

describe('PostService', () => {
	let service: PostService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					envFilePath: '.env.test',
				}),
			],
			providers: [PostService],
		}).compile();

		service = module.get<PostService>(PostService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#findById', () => {
		beforeEach(() => {
			nock.cleanAll();
		});

		it('returns undefined if the post does not exits', async () => {
			mockPostNotFoundRequest(-1);

			const response = await service.findById(-1);

			expect(response).toBeUndefined();
		});

		it('returns a list of comments if the post have any comments', async () => {
			const post = PostBuilder.build();
			mockPostFoundRequest(post);

			const response = await service.findById(post.id);

			expect(response).toStrictEqual(post);
		});
	});
});

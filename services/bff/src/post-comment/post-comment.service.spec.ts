import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';

import { PostCommentBuilder } from '../../test/utils/builders/PostCommentBuilder';
import { PostCommentService } from './post-comment.service';

describe('PostCommentService', () => {
	let service: PostCommentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PostCommentService],
		}).compile();

		service = module.get<PostCommentService>(PostCommentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('#findByPostId', () => {
		beforeEach(() => {
			nock.cleanAll();
		});

		it('returns an empty array if there is no comment for that post', async () => {
			nock('https://jsonplaceholder.typicode.com')
				.get('/comments')
				.query({ postId: -1 })
				.reply(200, []);
			const response = await service.findByPostId(-1);

			expect(response).toStrictEqual([]);
		});

		it('returns a list of comments if the post have any comments', async () => {
			const comment = PostCommentBuilder.build();
			nock('https://jsonplaceholder.typicode.com')
				.get('/comments')
				.query({ postId: comment.postId })
				.reply(200, [comment]);

			const response = await service.findByPostId(comment.postId);

			expect(response).toStrictEqual(expect.arrayContaining([comment]));
		});
	});
});

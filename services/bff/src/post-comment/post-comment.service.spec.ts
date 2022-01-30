import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';

import { PostCommentBuilder } from '../../test/utils/builders/PostCommentBuilder';
import { mockPostCommentForPostIdFoundRequest } from '../../test/utils/requests/post-comment.requests';
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
			mockPostCommentForPostIdFoundRequest(-1, []);
			const response = await service.findByPostId(-1);

			expect(response).toStrictEqual([]);
		});

		it('returns a list of comments if the post have any comments', async () => {
			const comment = PostCommentBuilder.build();
			mockPostCommentForPostIdFoundRequest(comment.postId, [comment]);

			const response = await service.findByPostId(comment.postId);

			expect(response).toStrictEqual(expect.arrayContaining([comment]));
		});
	});
});

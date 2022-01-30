import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as MockResponse from 'mock-express-response';

import { PostBuilder } from '../../test/utils/builders/PostBuilder';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
	let controller: PostController;
	let postService: PostService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PostController],
			providers: [PostService],
		}).compile();

		controller = module.get<PostController>(PostController);
		postService = module.get<PostService>(PostService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('#findById', () => {
		it('returns 404 status code in the response if the post does not exits', async () => {
			const expressResponse = new MockResponse();
			const spyStatus = jest.spyOn(expressResponse, 'status');
			jest.spyOn(postService, 'findById').mockImplementation(() => Promise.resolve(undefined));

			await controller.findById(expressResponse, -1);

			expect(spyStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
		});

		it('returns the post ', async () => {
			const expressResponse = new MockResponse();
			const post = PostBuilder.build();
			jest.spyOn(postService, 'findById').mockImplementation(() => Promise.resolve(post));

			const response = await controller.findById(expressResponse, -1);

			expect(response).toMatchObject(post);
		});
	});
});

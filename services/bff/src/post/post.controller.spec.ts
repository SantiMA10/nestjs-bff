import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as MockResponse from 'mock-express-response';

import { PostBuilder } from '../../test/utils/builders/PostBuilder';
import { PostCommentBuilder } from '../../test/utils/builders/PostCommentBuilder';
import { UserBuilder } from '../../test/utils/builders/UserBuilder';
import { PostCommentService } from '../post-comment/post-comment.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
	let controller: PostController;
	let userService: UserService;
	let postService: PostService;
	let postCommentService: PostCommentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PostController],
			providers: [PostService, UserService, PostCommentService],
		}).compile();

		controller = module.get<PostController>(PostController);
		userService = module.get<UserService>(UserService);
		postService = module.get<PostService>(PostService);
		postCommentService = module.get<PostCommentService>(PostCommentService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('#findById', () => {
		it('returns 404 status code in the response if the user does not exits', async () => {
			const expressResponse = new MockResponse();
			const spyStatus = jest.spyOn(expressResponse, 'status');
			jest.spyOn(userService, 'findById').mockImplementation(() => Promise.resolve(undefined));
			const post = PostBuilder.build({ userId: -1 });
			jest.spyOn(postService, 'findById').mockImplementation(() => Promise.resolve(post));
			const comment = PostCommentBuilder.build({ postId: post.id });
			jest
				.spyOn(postCommentService, 'findByPostId')
				.mockImplementation(() => Promise.resolve([comment]));

			await controller.findById(expressResponse, post.id);

			expect(spyStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
		});

		it('returns 404 status code in the response if the post does not exits', async () => {
			const expressResponse = new MockResponse();
			const spyStatus = jest.spyOn(expressResponse, 'status');
			const user = UserBuilder.build();
			jest.spyOn(userService, 'findById').mockImplementation(() => Promise.resolve(user));
			jest.spyOn(postService, 'findById').mockImplementation(() => Promise.resolve(undefined));
			jest.spyOn(postCommentService, 'findByPostId').mockImplementation(() => Promise.resolve([]));

			await controller.findById(expressResponse, -1);

			expect(spyStatus).toHaveBeenCalledWith(HttpStatus.NOT_FOUND);
		});

		it('returns the post with the user and comments', async () => {
			const expressResponse = new MockResponse();
			const user = UserBuilder.build();
			jest.spyOn(userService, 'findById').mockImplementation(() => Promise.resolve(user));
			const post = PostBuilder.build({ userId: user.id });
			jest.spyOn(postService, 'findById').mockImplementation(() => Promise.resolve(post));
			const comment = PostCommentBuilder.build({ postId: post.id });
			jest
				.spyOn(postCommentService, 'findByPostId')
				.mockImplementation(() => Promise.resolve([comment]));

			const response = await controller.findById(expressResponse, -1);

			expect(response).toMatchObject({ ...post, user, comments: [comment] });
		});
	});
});

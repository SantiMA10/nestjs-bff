import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { PostBuilder } from './utils/builders/PostBuilder';
import { PostCommentBuilder } from './utils/builders/PostCommentBuilder';
import { UserBuilder } from './utils/builders/UserBuilder';
import { mockPostFoundRequest, mockPostNotFoundRequest } from './utils/requests/post.requests';
import { mockPostCommentForPostIdFoundRequest } from './utils/requests/post-comment.requests';
import { mockUserFoundRequest } from './utils/requests/user.requests';

describe('PostController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		nock.cleanAll();

		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	describe('/posts/:postId (GET)', () => {
		it('returns 200 if the post and the user exists', async () => {
			const user = UserBuilder.build();
			const post = PostBuilder.build({ userId: user.id });
			const comment = PostCommentBuilder.build({ postId: post.id });
			mockPostFoundRequest(post);
			mockUserFoundRequest(user);
			mockPostCommentForPostIdFoundRequest(post.id, [comment]);

			return request(app.getHttpServer())
				.get(`/posts/${post.id}`)
				.expect(200)
				.expect({ ...post, user, comments: [comment] });
		});

		it('returns 404 if the post does not exist', async () => {
			const user = UserBuilder.build();
			const post = PostBuilder.build({ userId: user.id });
			const comment = PostCommentBuilder.build({ postId: post.id });
			mockPostNotFoundRequest(-1);
			mockUserFoundRequest(user);
			mockPostCommentForPostIdFoundRequest(post.id, [comment]);

			return request(app.getHttpServer()).get('/posts/-1').expect(404).expect({});
		});
	});
});

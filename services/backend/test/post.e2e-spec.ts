import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as nock from 'nock';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { PostBuilder } from './utils/builders/PostBuilder';
import { mockPostFoundRequest, mockPostNotFoundRequest } from './utils/requests/post.requests';

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
		it('returns 200 if the post exists', async () => {
			const post = PostBuilder.build();

			mockPostFoundRequest(post);

			return request(app.getHttpServer()).get(`/posts/${post.id}`).expect(200).expect(post);
		});

		it('returns 404 if the post does not exist', async () => {
			mockPostNotFoundRequest(-1);

			return request(app.getHttpServer()).get('/posts/-1').expect(404).expect({});
		});
	});
});

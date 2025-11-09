import worker from '../index';
import { Env } from '../index';

describe('Worker', () => {
	// Mock environment and execution context
	const mockEnv: Env = {};
	const mockCtx: ExecutionContext = {
		waitUntil: jest.fn(),
		passThroughOnException: jest.fn(),
		props: {},
	};

	describe('fetch handler', () => {
		it('should return "Hello Worker!" response', async () => {
			const request = new Request('http://localhost/');
			const response = await worker.fetch(request, mockEnv, mockCtx);

			expect(response.status).toBe(200);
			expect(await response.text()).toBe('Hello Worker!');
		});

		it('should set Content-Type header to application/json', async () => {
			const request = new Request('http://localhost/');
			const response = await worker.fetch(request, mockEnv, mockCtx);

			expect(response.headers.get('Content-Type')).toBe('application/json');
		});

		it('should handle different request methods', async () => {
			const methods = ['GET', 'POST', 'PUT', 'DELETE'];

			for (const method of methods) {
				const request = new Request('http://localhost/', { method });
				const response = await worker.fetch(request, mockEnv, mockCtx);

				expect(response.status).toBe(200);
				expect(await response.text()).toBe('Hello Worker!');
			}
		});

		it('should handle different URLs', async () => {
			const urls = ['http://localhost/', 'http://localhost/api', 'http://localhost/test/path'];

			for (const url of urls) {
				const request = new Request(url);
				const response = await worker.fetch(request, mockEnv, mockCtx);

				expect(response.status).toBe(200);
				expect(await response.text()).toBe('Hello Worker!');
			}
		});

		it('should return a Response instance', async () => {
			const request = new Request('http://localhost/');
			const response = await worker.fetch(request, mockEnv, mockCtx);

			expect(response).toBeInstanceOf(Response);
		});
	});
});

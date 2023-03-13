import { Redis } from '@upstash/redis/cloudflare'

const redis = new Redis({
	url: 'https://pleasing-baboon-32126.upstash.io',
	token: 'AX1-ACQgODRhODRjNjEtNDZmMC00YzBhLWFlOGEtNTY4ZDlhMjRhOTI1YzgyZjUwNTZiOGUyNGZhYTg1ZDZkOTQwYjJjNGFmMmE=',
  })
export interface Env {

}

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {

		const {pathname} = new URL(request.url)

		switch (pathname) {
			case '/write': {

				const count = await redis.incr('count')

				return new Response(JSON.stringify({ count }), {
					headers: {
						'Content-type': 'application/json'
					}
				})
			}
			case '/read': {
				const count = await redis.get('count')

				return new Response(JSON.stringify({ count  }), {
					headers: {
						'Content-type': 'application/json'
					}
				})
			}

			case '/': {
				return new Response("Hello World!");
			}
			case'/amor':{
				return new Response("Te AMO  .. Muito ++++");
			}
			default: {
				return new Response(null, { status: 404 })
			}

		}
	},
};

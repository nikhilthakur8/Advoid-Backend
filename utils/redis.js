const { createClient } = require("redis");

const client = createClient({
	url: process.env.REDIS_URL,
	socket: {
		reconnectStrategy: (retries) => Math.min(retries * 50, 500),
	},
});

async function connectRedis() {
	try {
		await client.connect();
		console.log("Connected to Redis");
	} catch (error) {
		console.log("Redis connection error:", error);
		process.exit(1);
	}
}

module.exports = {
	client,
	connectRedis,
};

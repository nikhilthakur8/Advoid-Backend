const { createClient } = require("redis");

const client = createClient({
	url: process.env.REDIS_URL,
	socket: {
		reconnectStrategy: (retries) => {
			return Math.min(retries * 100, 3000);
		},
	},
});

async function connectRedis() {
	try {
		await client.connect();
		client.on("error", (err) => {
			console.error("Redis Client Error", err);
		});
		console.log("Connected to Redis");
	} catch (error) {
		console.log("Redis connection error:", error);
	}
}

module.exports = {
	client,
	connectRedis,
};

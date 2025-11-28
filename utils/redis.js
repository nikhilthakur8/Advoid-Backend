const { createClient } = require("redis");

const client = createClient({
	url: process.env.REDIS_URL,
});

async function connectRedis() {
	try {
		await client.connect();
		console.log("Connected to Redis");

		// Listen for redis client errors
		client.on("error", (err) => {
			console.log("Redis Client Error", err);
			process.exit(1);
		});
	} catch (error) {
		console.log("Redis connection error:", error);
		process.exit(1);
	}
}

module.exports = {
	client,
	connectRedis,
};

const { client } = require("../utils/redis");

async function publish(channel, message) {
	try {
		await client.publish(channel, message);
		console.log(`Message published to channel ${channel}`);
	} catch (error) {
		console.error(
			`Failed to publish message to channel ${channel}:`,
			error
		);
	}
}

module.exports = { publish };

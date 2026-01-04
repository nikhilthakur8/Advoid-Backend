const prisma = require("../utils/prismaClient");
const Log = require("../models/Log");
async function handleGetUserConfigs(req, res) {
	try {
		const { userId } = req.params;

		if (!userId || isNaN(Number(userId))) {
			return res.status(400).json({ message: "Invalid user ID." });
		}

		// check if user exists
		const user = await prisma.user.findUnique({
			where: {
				id: Number(userId),
			},
			select: {
				AllowList: {
					select: {
						domain: true,
						active: true,
					},
				},
				DenyList: {
					select: {
						domain: true,
						active: true,
					},
				},
				id: true,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		return res.status(200).json({
			data: {
				userId: user.id,
				allowList: user.AllowList,
				denyList: user.DenyList,
			},
		});
	} catch (error) {
		console.log("Error fetching deny list:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
}

async function handleIngestLogs(req, res) {
	try {
		const { logs } = req.body;
		if (!Array.isArray(logs) || logs.length === 0) {
			return res.status(400).json({ message: "Invalid logs data." });
		}

		await Log.insertMany(logs);

		return res.status(200).json({ message: "Logs ingested successfully." });
	} catch (error) {
		console.log("Error ingesting logs:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
}

async function handleWatchLogsEvent(req, res) {
	try {
		res.setHeader("Content-Type", "text/event-stream");
		res.setHeader("Cache-Control", "no-cache");
		res.setHeader("Connection", "keep-alive");
		res.flushHeaders();

		const sendEvent = (data) => {
			res.write(`data: ${JSON.stringify(data)}\n\n`);
		};

		const logWatch = Log.watch([{ $match: { operationType: "insert" } }]);

		let closed = false;

		const cleanup = async () => {
			if (closed) return;
			closed = true;

			try {
				await logWatch.close();
			} catch {}

			if (!res.writableEnded) {
				res.end();
			}
		};

		logWatch.on("change", (change) => {
			if (!res.writableEnded) {
				sendEvent({ log: change.fullDocument });
			}
		});

		logWatch.on("error", async (err) => {
			console.error("Watch error:", err);
			await cleanup();
		});

		req.on("close", cleanup);
	} catch (error) {
		console.log("Error in logs event stream:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
}

module.exports = {
	handleGetUserConfigs,
	handleIngestLogs,
	handleWatchLogsEvent,
};

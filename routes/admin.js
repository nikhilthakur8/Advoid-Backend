const express = require("express");
const {
	handleGetUserConfigs,
	handleIngestLogs,
	handleWatchLogsEvent,
} = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/user-configs/:userId", handleGetUserConfigs);
adminRouter.post("/ingest-logs", handleIngestLogs);
adminRouter.get("/watch-logs", handleWatchLogsEvent);
module.exports = adminRouter;

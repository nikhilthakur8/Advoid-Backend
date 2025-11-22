const express = require("express");
const { handleGetUserConfigs } = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/user-configs/:userId", handleGetUserConfigs);

module.exports = adminRouter;

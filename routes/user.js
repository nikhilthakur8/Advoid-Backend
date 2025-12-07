const express = require("express");
const userRouter = express.Router();
const {
	handleAllowListAdd,
	handleAllowListDelete,
	handleDenyListAdd,
	handleDenyListDelete,
	handleDenyListUpdate,
	handleGetDenyList,
	handleGetProfile,
	handleAllowListUpdate,
	handleGetAllowList,
} = require("../controllers/user");

userRouter.post("/deny-list", handleDenyListAdd);
userRouter.patch("/deny-list/:denyListId", handleDenyListUpdate);
userRouter.delete("/deny-list/:denyListId", handleDenyListDelete);
userRouter.get("/deny-list", handleGetDenyList);

userRouter.post("/allow-list", handleAllowListAdd);
userRouter.patch("/allow-list/:allowListId", handleAllowListUpdate);
userRouter.delete("/allow-list/:allowListId", handleAllowListDelete);
userRouter.get("/allow-list", handleGetAllowList);

userRouter.get("/profile", handleGetProfile);

module.exports = userRouter;

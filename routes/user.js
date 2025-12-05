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
} = require("../controllers/user");

userRouter.post("/deny-list", handleDenyListAdd);
userRouter.patch("/deny-list/:denyListId", handleDenyListUpdate);
userRouter.delete("/deny-list/:denyListId", handleDenyListDelete);
userRouter.get("/deny-list", handleGetDenyList);

userRouter.get("/profile", handleGetProfile);

module.exports = userRouter;

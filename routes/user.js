const express = require("express");
const userRouter = express.Router();
const {
	handleAllowListAdd,
	handleAllowListDelete,
	handleDenyListAdd,
	handleDenyListDelete,
	handleDenyListUpdate,
	handleGetDenyList,
} = require("../controllers/user");

userRouter.post("/deny-list", handleDenyListAdd);
userRouter.patch("/deny-list/:denyListId", handleDenyListUpdate);
userRouter.delete("/deny-list/:denyListId", handleDenyListDelete);
userRouter.get("/deny-list", handleGetDenyList);

module.exports = userRouter;

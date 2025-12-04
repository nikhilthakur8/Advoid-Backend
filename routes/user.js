const express = require("express");
const userRouter = express.Router();
const {
	handleAllowListAdd,
	handleAllowListDelete,
	handleDenyListAdd,
	handleDenyListDelete,
	handleDenyListUpdate,
} = require("../controllers/user");

userRouter.post("/deny-list", handleDenyListAdd);
userRouter.patch("/deny-list/:denyListId", handleDenyListUpdate);
userRouter.delete("/deny-list/:denyListId", handleDenyListDelete);

module.exports = userRouter;

const { handleLogin, handleSignup } = require("../controllers/auth");
const validateBody = require("../middlewares/validateBody.js");
const { loginSchema, signupSchema } = require("../validations/auth");
const express = require("express");

const authRouter = express.Router();

authRouter.post("/login", validateBody(loginSchema), handleLogin);
authRouter.post("/signup", validateBody(signupSchema), handleSignup);

module.exports = authRouter;

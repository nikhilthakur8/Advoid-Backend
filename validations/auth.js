const z = require("zod");

const loginSchema = z.object({
	email: z.email(),
	password: z.string().min(6),
});

const signupSchema = z.object({
	email: z.email(),
	name: z.string().min(2).max(100),
	password: z.string().min(8).max(100),
});

module.exports = {
	loginSchema,
	signupSchema,
};

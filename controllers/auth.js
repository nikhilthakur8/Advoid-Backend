const prisma = require("../utils/prismaClient");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt");
async function handleLogin(req, res) {
	try {
		const { email, password } = req.body;

		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		// check password
		const isPasswordValid = bcrypt.compareSync(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid credentials" });
		}

		// generate the token
		const token = generateToken({ id: user.id });
		// set token in httpOnly cookie
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "None",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		const { password: _, ...safeUserData } = user;
		return res.status(200).json({
			message: "Login successful",
			token,
			user: safeUserData,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}
async function handleSignup(req, res) {
	try {
		const { email, password, name } = req.body;

		// check for existing user
		const user = await prisma.user.findUnique({
			where: { email },
		});
		if (user) {
			return res.status(409).json({ error: "User already exists" });
		}

		const hashedPassword = bcrypt.hashSync(password, 10);

		// create new user
		const newUser = await prisma.user.create({
			data: {
				email,
				password: hashedPassword,
				name,
			},
		});
		// generate the token
		const token = generateToken({ id: newUser.id });

		// set token in httpOnly cookie
		res.cookie("token", token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "None",
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
		});

		return res.status(201).json({ message: "Signup successful" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
}

module.exports = { handleLogin, handleSignup };

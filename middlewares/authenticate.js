const { verifyToken } = require("../utils/jwt");
const prisma = require("../utils/prismaClient");
async function authenticate(req, res, next) {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const decoded = await verifyToken(token);
		const user = await prisma.user.findUnique({
			where: { id: decoded.id },
		});
		if (!user) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({ message: "Unauthorized" });
	}
}

module.exports = authenticate;

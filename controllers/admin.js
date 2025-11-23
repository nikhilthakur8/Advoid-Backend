const prisma = require("../utils/prismaClient");
async function handleGetUserConfigs(req, res) {
	try {
		const { userId } = req.params;

		// check if user exists
		const user = await prisma.user.findUnique({
			where: {
				id: Number(userId),
			},
		});
		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}

		const allowList = prisma.allowList.findMany({
			where: {
				userId: Number(userId),
			},
			select: {
				domain: true,
				active: true,
			},
		});

		const denyList = prisma.denyList.findMany({
			where: {
				userId: Number(userId),
			},
			select: {
				domain: true,
				active: true,
			},
		});

		const [resolvedAllowList, resolvedDenyList] = await Promise.all([
			allowList,
			denyList,
		]);

		return res.status(200).json({
			data: {
				denyList: resolvedDenyList,
				allowList: resolvedAllowList,
			},
		});
	} catch (error) {
		console.log("Error fetching deny list:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
}
module.exports = { handleGetUserConfigs };

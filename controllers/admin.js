const prisma = require("../utils/prismaClient");

async function handleGetUserConfigs(req, res) {
	try {
		const { userId } = req.params;

		if (!userId || isNaN(Number(userId))) {
			return res.status(400).json({ message: "Invalid user ID." });
		}

		// check if user exists
		const user = await prisma.user.findUnique({
			where: {
				id: Number(userId),
			},
			select: {
				AllowList: {
					select: {
						domain: true,
						active: true,
					},
				},
				DenyList: {
					select: {
						domain: true,
						active: true,
					},
				},
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found." });
		}


		return res.status(200).json({
			data: {
				allowList: user.AllowList,
				denyList: user.DenyList,
			},
		});
	} catch (error) {
		console.log("Error fetching deny list:", error);
		return res.status(500).json({ message: "Internal server error." });
	}
}
module.exports = { handleGetUserConfigs };

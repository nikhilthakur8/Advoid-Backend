const { publish } = require("../helpers/publish");
const prisma = require("../utils/prismaClient");

async function handleGetProfile(req, res) {
	try {
		const { password, createdAt, updatedAt, ...userData } = req.user;
		return res.status(200).json({ user: userData });
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
}

async function handleDenyListAdd(req, res) {
	try {
		const user = req.user;
		const { domain } = req.body;

		// check if the domain already exists for the user
		const existingEntry = await prisma.denyList.findFirst({
			where: {
				domain,
				userId: user.id,
			},
		});

		if (existingEntry) {
			return res
				.status(400)
				.json({ message: "Domain already exists in deny list." });
		}

		const data = await prisma.denyList.create({
			data: {
				domain,
				active: true,
				userId: user.id,
			},
		});

		await publish(
			"user_config_updates",
			JSON.stringify({ userId: user.id })
		);

		res.status(201).json({
			message: "Domain added to deny list successfully.",
			data: data,
		});
	} catch (error) {
		console.error("Error adding domain to deny list:", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function handleDenyListUpdate(req, res) {
	try {
		const user = req.user;
		const { denyListId } = req.params;
		const { active } = req.body;

		// update the active status of the deny list entry
		const updatedEntry = await prisma.denyList.update({
			where: {
				id: parseInt(denyListId),
				userId: user.id,
			},
			data: {
				active,
			},
		});

		if (!updatedEntry) {
			return res
				.status(404)
				.json({ message: "Deny list entry not found." });
		}

		await publish(
			"user_config_updates",
			JSON.stringify({ userId: user.id })
		);

		return res.status(200).json({
			message: "Domain updated in deny list successfully.",
		});
	} catch (error) {
		console.error("Error updating domain in deny list:", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function handleGetDenyList(req, res) {
	try {
		const user = req.user;

		const denyList = await prisma.denyList.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		return res.status(200).json({ denyList });
	} catch (error) {
		console.error("Error fetching deny list:", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function handleDenyListDelete(req, res) {
	try {
		const user = req.user;
		const { denyListId } = req.params;

		const deletedEntry = await prisma.denyList.deleteMany({
			where: {
				id: parseInt(denyListId),
				userId: user.id,
			},
		});
		if (deletedEntry.count === 0) {
			return res
				.status(404)
				.json({ message: "Deny list entry not found." });
		}

		await publish(
			"user_config_updates",
			JSON.stringify({ userId: user.id })
		);

		return res.status(200).json({
			message: "Domain deleted from deny list successfully.",
		});
	} catch (error) {
		console.error("Error deleting domain from deny list:", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function handleAllowListAdd(req, res) {
	try {
	} catch (error) {}
}

async function handleAllowListDelete(req, res) {
	try {
	} catch (error) {}
}

module.exports = {
	handleDenyListAdd,
	handleDenyListDelete,
	handleGetDenyList,
	handleDenyListUpdate,
	handleAllowListAdd,
	handleAllowListDelete,
	handleGetProfile,
};

const prisma = require("../utils/prismaClient");

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

		await prisma.denyList.create({
			data: {
				domain,
				active: true,
				userId: user.id,
			},
		});

		res.status(201).json({
			message: "Domain added to deny list successfully.",
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

		res.status(200).json({
			message: "Domain updated in deny list successfully.",
		});
	} catch (error) {
		console.error("Error updating domain in deny list:", error);
		res.status(500).json({ message: "Internal server error." });
	}
}

async function handleDenyListDelete(req, res) {
	try {
	} catch (error) {}
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
	handleDenyListUpdate,
	handleAllowListAdd,
	handleAllowListDelete,
};

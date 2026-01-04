const jsonwebtoken = require("jsonwebtoken");

function generateToken(payload, options = {}) {
	return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
		...options,
		expiresIn: "7d",
	});
}

async function verifyToken(token) {
	try {
		return jsonwebtoken.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		return null;
	}
}

module.exports = { generateToken, verifyToken };

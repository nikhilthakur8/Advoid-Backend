const jsonwebtoken = require("jsonwebtoken");

function generateToken(payload, options = {}) {
	return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1h",
		...options,
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

const { ZodError } = require("zod");

function validateBody(schema) {
	return (req, res, next) => {
		try {
			const validatedData = schema.parse(req.body);
			req.body = validatedData;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				return res.status(400).json({
					status: "validation_error",
					errors: error.issues,
				});
			}
			return res.status(500).json({
				status: "error",
				message: "Internal server error during validation",
			});
		}
	};
}

module.exports = validateBody;

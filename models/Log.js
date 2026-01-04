const mongoose = require("mongoose");

const logSchema = new mongoose.Schema(
	{
		timestamp: {
			type: Date,
			expires: "30d",
		},
		userId: {
			type: String,
			index: true,
		},
		domain: {
			type: String,
		},
		type: {
			type: String,
		},
		action: {
			type: Boolean,
		},
	},
	{
		timestamps: true,
	}
);

const Log = mongoose.model("Log", logSchema);

module.exports = Log;

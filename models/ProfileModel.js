const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
		},
		about: {
			type: String,
			required: true,
		},
		social: {
			facebook: { type: String },
			instagram: { type: String },
		},
	},
	{ timestamp: true },
);
module.exports = mongoose.model("profile", profileSchema);

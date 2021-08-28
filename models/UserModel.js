const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		profilePic: {
			type: String,
		},
		newMsgPopUp: {
			type: Boolean,
			default: true,
		},
		unreadMsg: {
			type: Boolean,
			default: false,
		},
		unreadNotif: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: "user",
			enum: ["user", "root"],
		},
		resetToken: {
			type: String,
		},
		expireToken: {
			type: Date,
		},
	},
	{ timestamp: true },
);

module.exports = mongoose.model("User", userSchema);

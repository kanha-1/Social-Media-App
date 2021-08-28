const userModel = require("../../models/UserModel");
const profieModel = require("../../models/ProfileModel");
const followersModel = require("../../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");

module.exports = {
	getData: async (req, res) => {
		const { userId } = req;
		try {
			const user = await userModel.findById(userId);
			const userFollowStatus = await followersModel.findOne({ user: userId });
			return res.status(200).json({ user, userFollowStatus });
		} catch (err) {
			console.log(err);
			return res.status(400).send("server error");
		}
	},
	login: async (req, res) => {
		const { email, password } = req.body.user;
		if (!isEmail(email)) return res.status(401).send("Invalid Email");
		try {
			const user = await userModel
				.findOne({ email: email.toLowerCase() })
				.select("+password");
			if (!user) {
				return res.status(401).send("Invalid Ceredentials");
			}
			const isPassword = await bcrypt.compare(password, user.password);
			if (!isPassword) {
				return res.status(401).send("Invalid Ceredentials");
			}
			const payload = { userId: user._id };
			jwt.sign(
				payload,
				process.env.SECRET_KEY,
				{ expiresIn: "1d" },
				(err, token) => {
					if (err) throw err;
					res.status(200).json(token);
				},
			);
		} catch (err) {
			console.log(err);
			res.status(500).send("server error");
		}
	},
};

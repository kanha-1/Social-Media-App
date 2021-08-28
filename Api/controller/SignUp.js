const userModel = require("../../models/UserModel");
const profieModel = require("../../models/ProfileModel");
const followersModel = require("../../models/FollowerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const isEmail = require("validator/lib/isEmail");
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const DefaultUserPic =
	"https://res.cloudinary.com/dsseuwzzr/image/upload/v1599320656/nfwqmevulwuimrqbmcws.png";


module.exports = {
	// user-name check logic
	userNameCheck: async (req, res) => {
		const { username } = req.params;
		try {
			if (username.length < 1) return res.status(401).send("Invalid");
			if (!regexUserName.test(username))
				return res.status(401).send("Invalid username");
			const user = await userModel.findOne({
				username: username.toLowerCase(),
			});
			if (user) return res.status(401).send("Username Not Available");
			return res.status(200).send("Available");
		} catch (err) {
			console.log(err);
			res.status(500).send("server error");
		}
	},

	// register logic
	register: async (req, res) => {
		const {
			name,
			email,
			username,
			password,
			about,
			facebook,
			instagram,
		} = req.body.user;
		if (!isEmail(email)) return res.status(401).send("Invalid Email");
		if (password.length < 6)
			return res.status(401).send("Password length must more than 6");
		try {
			let user;
			user = await userModel.findOne({ email: email.toLowerCase() });
			if (user) {
				return res.status(401).send("User Already Registerd");
			}
			user = new userModel({
				name,
				email: email.toLowerCase(),
				username: username.toLowerCase(),
				password,
				profilePic: req.body.profilePic || DefaultUserPic,
			});
            //Hashing password 
			user.password = await bcrypt.hash(password, 10);
			await user.save();

            // creatng profile model
			let profile = {};
			profile.user = user._id;
			profile.about = about;
			profile.social = {};
			if (facebook) profile.social.facebook = facebook;
			if (instagram) profile.social.instagram = instagram;
            await new profieModel(profile).save()
            await new followersModel({user:user._id,followers:[],following:[]}).save()

            // creating jwt token
            const payload = {userId:user._id}
            jwt.sign(payload,process.env.SECRET_KEY,{expiresIn:"1d"},(err,token)=>{
                if(err) throw (err);
                res.status(200).json(token)
            })

		} catch (err) {
			console.log(err);
			res.status(500).send("server error");
		}
	},
};

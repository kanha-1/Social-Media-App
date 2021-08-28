const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		if (!req.headers.authorization) {
			return res.status(401).send("Unauthorized");
		}
		const { userId } = jwt.verify(
			req.headers.authorization,
			process.env.SECRET_KEY,
		);
		req.userId = userId;
		next();
	} catch (error) {
		return res.status(401).send("Unauthorized");
	}
};

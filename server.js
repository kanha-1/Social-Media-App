const express = require("express");
const app = express();
const server = require("http").Server(app);
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const PORT = process.env.PORT || 3000;
require("dotenv").config();
require("./config/connectDb");
app.use(express.json());

// routes requier
// const authRoute = requi("./Api/routes/userAuth")

nextApp.prepare().then(() => {
	app.use("/user/api", require("./Api/routes/userAuth"));
	app.all("*", (req, res) => handle(req, res));
	server.listen(PORT, (err) => {
		if (err) throw err;
		console.log(`server running on ${PORT}`);
	});
});

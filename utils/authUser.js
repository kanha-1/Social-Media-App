import axios from "axios";
import baseUrl from "./baseUrl";
import catcheErr from "./catchErrors";
import cookie from "js-cookie";
import Router from "next/router";

export const registerUser = async (user, profilePic, setError, setLoading) => {
	setLoading(true);
	try {
		const response = await axios.post(`${baseUrl}/user/api/signup`, {
			user,
			profilePic,
		});
		setToken(response.data);
	} catch (error) {
		const errMsg = catcheErr(error);
		setLoading(false);
		setError(errMsg);
	}
	setLoading(false)
};
export const loginUser = async (user, setError, setLoading) => {
	setLoading(true);
	try {
		const response = await axios.post(`${baseUrl}/user/api/signin`, { user });
		setToken(response.data);
	} catch (error) {
		const errMsg = catcheErr(error);
		setLoading(false);
		setError(errMsg);
	}
	setLoading(false)
};

export const redirectUser = (ctx, location) => {
	if (ctx.req) {
		ctx.res.writeHead(302, { Location: location });
		ctx.res.end();
	} else {
		Router.push(location)
	}
};
const setToken = (token) => {
	cookie.set("token", token);
};

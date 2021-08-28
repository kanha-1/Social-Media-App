import axios from "axios";
import baseUrl from "./baseUrl";
import catcheErr from "./catchErrors";
import cookie from "js-cookie";
export const registerUser = async (user, profilePic, setError,setLoading) => {
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
};

const setToken = (token) => {
	cookie.set("token", token);
};

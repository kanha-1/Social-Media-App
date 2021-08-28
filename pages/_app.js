import App from "next/app";
import Layout from "../components/Layout/Layout";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";
import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";
class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const { token } = parseCookies(ctx);
		let pageProps = {};

		const protectedRoute = ctx.pathname === "/";

		if (!token) {
			destroyCookie(ctx, "token");
			protectedRoute && redirectUser(ctx, "/signin");
		} else {
			if (Component.getInitialProps) {
				pageProps = await Component.getInitialProps(ctx);
			}
			try {
				const response = await axios.get(`${baseUrl}/user/api/userProfile`, {
					headers: { Authorization: token },
				});
				const { user, userFollowStatus } = response.data;
				if (user) !protectedRoute && redirectUser(ctx, "/");
				pageProps.user = user;
				pageProps.userFollowStatus = userFollowStatus;
			} catch (error) {
				destroyCookie(ctx, "token");	
				redirectUser(ctx, "/signin");
				console.log("SOME ERROR", error);
			}
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps } = this.props;
		return (
			<Layout {...pageProps}>
				<Component {...pageProps} />
			</Layout>
		);
	}
}
export default MyApp;

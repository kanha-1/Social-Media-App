import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
export const HeaderMessage = () => {
	const router = useRouter();
	const signUpRoute = router.pathname === "/signup";
	return (
		<Message
			color="teal"
			attached
			header={signUpRoute ? "Get Started" : "Welcome Back"}
			icon={signUpRoute ? "settings" : "privacy"}
			content={
				signUpRoute
					? "Create a New Account"
					: "Login With Register Email and Password"
			}
		/>
	);
};
export const FooterMessage = () => {
	const router = useRouter();
	const signUpRoute = router.pathname === "/signup";
	return (
		<>
			{signUpRoute ? (
				<>
					<Message attached="bottom" warning>
						<Icon name="help" />
						Already Registed ? <Link href="/signin">Login-In Here</Link>
					</Message>
					<Divider hidden />
				</>
			) : (
				<>
					<Message attached="bottom" info>
						<Icon name="lock" />
						<Link href="/reset">Forgot Password</Link>
					</Message>
					<Message attached="bottom" warning>
						<Icon name="help" />
						New User ? <Link href="/signup">Register Here</Link>
					</Message>
				</>
			)}
		</>
	);
};

import React from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link";
function Navbar() {
	const router = useRouter();
	const isActive = (route) => router.pathname === route;
	return (
		<Menu>
			<Container>
				<Link href="/signin">
					<Menu.Item header active={isActive("/signin")}>
						<Icon size="large" name="sign-in" />
						Login
					</Menu.Item>
				</Link>
				<Link href="/signup">
					<Menu.Item header active={isActive("/signup")}>
						<Icon size="large" name="signup" />
						Register
					</Menu.Item>
				</Link>
			</Container>
		</Menu>
	);
}

export default Navbar;

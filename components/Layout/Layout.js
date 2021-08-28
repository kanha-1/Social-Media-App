import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import {
	Container,
	Visibility,
	Grid,
	Sticky,
	Ref,
	Divider,
	Segment,
} from "semantic-ui-react";
import nProgress from "nprogress";
import Router from "next/router";
import SideBar from "./sideBar";
import SearchBar from "./searchBar";
function Layout({ children, user }) {
	const contextRef = createRef();
	Router.onRouteChangeStart = () => nProgress.start();
	Router.onRouteChangeComplete = () => nProgress.done();
	Router.onRouteChangeError = () => nProgress.done();
	return (
		<>
			<HeadTags />
			{user ? (
				<>
					<div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
						<Ref innerRef={contextRef}>
							<Grid>
								<Grid.Column floated="left" width={2}>
									<Sticky context={contextRef}>
										<SideBar user={user} />
									</Sticky>
								</Grid.Column>
								<Grid.Column width={10}>
									<Visibility context={contextRef}>{children}</Visibility>
								</Grid.Column>
								<Grid.Column floated="left" width={4}>
									<Sticky context={contextRef}>
										<Segment basic>
											<SearchBar />
										</Segment>
									</Sticky>
								</Grid.Column>
							</Grid>
						</Ref>
					</div>
				</>
			) : (
				<>
					<Navbar />
					<Container style={{ paddingTop: "1rem" }} text>
						{children}
					</Container>
				</>
			)}
		</>
	);
}

export default Layout;

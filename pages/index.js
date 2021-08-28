import React, { useEffect } from "react";
import axios from "axios";
function Index({ user, userFollowStatus }) {
	console.log({ user, userFollowStatus });
	useEffect(() => {
		document.title = `Welcome ${user.name.split(' ')[0]}`
	}, [])
	return (
		<div>
                <h2>hello api</h2>

		</div>
	);
}

export default Index;

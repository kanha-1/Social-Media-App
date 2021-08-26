import React, { useState, useEffect, useRef } from "react";
import { HeaderMessage, FooterMessage } from "../components/common/Welcome";
import {
	Form,
	Button,
	Message,
	TextArea,
	Divider,
	Segment,
} from "semantic-ui-react";
function signin() {
    const [user, setUser] = useState({
        emai: "",
		password: "",
	});
    const { email, password } = user;
	const [showPassword, setShowPassword] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [formLoading, setFormLoading] = useState(false);
	const [desableSubmit, setDesableSubmit] = useState(true);

	useEffect(() => {
		const isUserTyped = Object.values({ email, password }).every((item) =>
			Boolean(item),
		);
		isUserTyped ? setDesableSubmit(false) : setDesableSubmit(true);
	}, [user]);

	const handelChange = (e) => {
		const { name, value } = e.target;
		setUser((preval) => ({ ...preval, [name]: value }));
	};
	const handelSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<>
			<HeaderMessage />

			<Form
				loading={formLoading}
				error={errMsg !== null}
				onSubmit={handelSubmit}>
				<Message
					error
					header="ohh Nooo !!"
					content={errMsg}
					onDismiss={() => setErrMsg(null)}
				/>
				<Segment>
					<Form.Input
						required
						label="Your Email"
						placeholder="Please Enter Your Email"
						name="email"
						value={email}
						type="email"
						onChange={handelChange}
						fluid
						icon="envelope"
						iconPosition="left"
					/>
					<Form.Input
						required
						label="Your Password"
						placeholder="Please Enter Your Password"
						name="password"
						value={password}
						type={showPassword ? "text" : "password"}
						onChange={handelChange}
						fluid
						icon={{
							name: "eye",
							circular: true,
							link: true,
							onClick: () => setShowPassword(!showPassword),
						}}
						iconPosition="left"
					/>
					<Divider hidden />
					<Button
						icon="signup"
						content="Login"
						type="submit"
						color="orange"
						disabled={desableSubmit}
					/>
				</Segment>
			</Form>
			<FooterMessage />
		</>
	);
}

export default signin;

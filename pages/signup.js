import React, { useState, useEffect, useRef } from "react";
import { HeaderMessage, FooterMessage } from "../components/common/Welcome";
import SocialInput from "../components/common/SocialInput";
export const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
import {
	Form,
	Button,
	Message,
	TextArea,
	Divider,
	Segment,
} from "semantic-ui-react";

function signup() {
	const [user, setUser] = useState({
		name: "",
		emai: "",
		password: "",
		about: "",
		facebook: "",
		instagram: "",
		twitter: "",
	});
	const { name, email, password, about } = user;
	const [showPassword, setShowPassword] = useState(false);
	const [errMsg, setErrMsg] = useState(null);
	const [formLoading, setFormLoading] = useState(false);
	const [userName, setUserName] = useState("");
	const [userNameLoading, setUserNameLoading] = useState(false);
	const [userNameAvailable, setUserNameAvailable] = useState(false);
	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [desableSubmit, setDesableSubmit] = useState(true);

	const handelSubmit = (e) => {
		e.preventDefault();
	};

	const handelChange = (e) => {
		const { name, value } = e.target;
		setUser((preval) => ({ ...preval, [name]: value }));
	};

	const checkUserName = (e) => {
		setUserName(e.target.value);
		if (regexUserName.test(e.target.value)) {
			setUserNameAvailable(true);
		} else {
			setUserNameAvailable(false);
		}
	};

	useEffect(() => {
		const isUserTyped = Object.values({ name, email, password, about }).every(
			(item) => Boolean(item),
		);
		isUserTyped ? setDesableSubmit(false) : setDesableSubmit(true);
	}, [user]);
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
						label="Your Name"
						placeholder="Please Enter Your Name"
						name="name"
						value={name}
						onChange={handelChange}
						fluid
						icon="user"
						iconPosition="left"
					/>
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
					<Form.Input
						loading={userNameLoading}
						error={!userNameAvailable}
						required
						label="Username"
						placeholder="Please Choose a Username"
						value={userName}
						onChange={checkUserName}
						fluid
						icon={userNameAvailable ? "check" : "close"}
						iconPosition="left"
					/>
					<SocialInput
						user={user}
						showSocialLinks={showSocialLinks}
						setShowSocialLinks={setShowSocialLinks}
						handelChange={handelChange}
					/>
					<Divider hidden />
					<Button
						content="Register"
						type="submit"
						color="orange"
						disabled={desableSubmit || !userNameAvailable}
					/>
				</Segment>
			</Form>

			<FooterMessage />
		</>
	);
}

export default signup;

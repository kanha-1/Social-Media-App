import React, { useState, useEffect, useRef } from "react";
import { HeaderMessage, FooterMessage } from "../components/common/Welcome";
import SocialInput from "../components/common/SocialInput";
import DragImageUpload from "../components/common/DragImageUpload";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
import { registerUser } from "../utils/authUser";
import uploadPicture from "../utils/uploadPicToCloudinary";
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
		email: "",
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
	const [username, setUserName] = useState("");
	const [userNameLoading, setUserNameLoading] = useState(false);
	const [userNameAvailable, setUserNameAvailable] = useState(false);
	const [showSocialLinks, setShowSocialLinks] = useState(false);
	const [desableSubmit, setDesableSubmit] = useState(true);
	const [media, setMedia] = useState(null);
	const [mediaPrev, setMediaPrev] = useState(null);
	const [highlited, setHighlited] = useState(false);
	const inputRef = useRef();
	let cancel;
	const handelSubmit = async (e) => {
		e.preventDefault();
		setFormLoading(true);
		let profilePic;
		if (media !== null) {
			profilePic = await uploadPicture(media);
		}
		if (media !== null && !profilePic) {
			setFormLoading(false);
			return setErrMsg("Error Uploading Image");
		}
		await registerUser(user, profilePic, setErrMsg, setFormLoading);
	};
	const handelChange = (e) => {
		const { name, value, files } = e.target;
		setUser((preval) => ({ ...preval, [name]: value }));
		//forImage
		if (name === "media") {
			setMedia(files[0]);
			setMediaPrev(URL.createObjectURL(files[0]));
		}
	};
	const checkUserName = (e) => {
		setUserName(e.target.value);
		if (regexUserName.test(e.target.value)) {
			setUserNameAvailable(true);
		} else {
			setUserNameAvailable(false);
		}
	};

	const userNameAvailablecheck = async () => {
		setUserNameLoading(true);
		try {
			cancel && cancel();
			const CancelToken = axios.CancelToken;
			const response = await axios.get(
				`${baseUrl}/user/api/signup/${username}`,
				{
					cancelToken: new CancelToken((canceler) => {
						cancel = canceler;
					}),
				},
			);
			if(errMsg !== null)setErrMsg(null)
			if (response.data === "Available") {
				setUserNameAvailable(true);
				setUser((prev) => ({ ...prev, username }));
			}
		} catch (err) {
			setErrMsg("username not available");
			setUserNameAvailable(false)
		}
		setUserNameLoading(false);
	};
	useEffect(() => {
		const isUserTyped = Object.values({ name, email, password, about }).every(
			(item) => Boolean(item),
		);
		isUserTyped ? setDesableSubmit(false) : setDesableSubmit(true);
	}, [user]);

	useEffect(() => {
		username === "" ? setUserNameAvailable(false) : userNameAvailablecheck();
	}, [username]);

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
					<DragImageUpload
						mediaPrev={mediaPrev}
						setMediaPrev={setMediaPrev}
						setMedia={setMedia}
						inputRef={inputRef}
						highlited={highlited}
						setHighlited={setHighlited}
						handelChange={handelChange}
					/>
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
						value={username}
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
						icon="signup"
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

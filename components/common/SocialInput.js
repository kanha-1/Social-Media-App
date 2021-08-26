import { divide } from "lodash";
import React from "react";
import {
	Form,
	Button,
	Message,
	TextArea,
	Divider,
	Segment,
} from "semantic-ui-react";
function SocialInput({
	user: { about, facebook, instagram },
	handelChange,
	showSocialLinks,
	setShowSocialLinks,
}) {
	return (
		<>
			<Form.Field
				required
				control={TextArea}
				name="about"
				value={about}
				onChange={handelChange}
				placeholder="About Yourself"
			/>
			<Button
				content="Add Social Links"
				color="red"
				icon="at"
				type="button"
				onClick={() => setShowSocialLinks(!showSocialLinks)}
			/>
			{showSocialLinks && (
				<>
					<divide />
					<Form.Input
						icon="facebook f"
						iconPosition="left"
						name="facebook"
						value={facebook}
						onChange={handelChange}
					/>
					<Form.Input
						icon="instagram"
						iconPosition="left"
						name="instagram"
						value={instagram}
						onChange={handelChange}
					/>
					{/* <Form.Input
						icon="twitter"
						iconPosition="left"
						name="twitter"
						value={twi}
						onChange={handelChange}
					/> */}
					<Message
						icon="attention"
						info
						size="small"
						header="Social Links are optional"
					/>
				</>
			)}
		</>
	);
}

export default SocialInput;

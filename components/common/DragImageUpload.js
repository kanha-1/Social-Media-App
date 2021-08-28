import React from "react";
import { Form, Segment, Image, Icon, Header } from "semantic-ui-react";
function DragImageUpload({
	highlited,
	setHighlited,
	inputRef,
	setMedia,
	mediaPrev,
	setMediaPrev,
	handelChange,
}) {
	return (
		<>
			<Form.Field>
				<Segment>
					<input
						style={{ display: "none" }}
						type="file"
						accept="image/*"
						onChange={handelChange}
						name="media"
						ref={inputRef}
					/>
					<div
						onDragOver={(e) => {
							e.preventDefault();
							setHighlited(true);
						}}
						onDragLeave={(e) => {
							e.preventDefault();
							setHighlited(false);
						}}
						onDrop={(e) => {
							e.preventDefault();
							setHighlited(true);
							console.log(e.dataTransfer.files);
							const DragedImage = Array.from(e.dataTransfer.files);
							setMedia(DragedImage[0]);
							setMediaPrev(URL.createObjectURL(DragedImage[0]));
						}}>
						{mediaPrev === null ? (
							<>
								<Segment color={highlited ? "green" : ""} placeholder basic>
									<Header icon>
										<Icon
											name="file image outline"
											style={{ cursor: "pointer" }}
											onClick={() => inputRef.current.click()}
										/>
										Drag and Drop or Click here to upload Image
									</Header>
								</Segment>
							</>
						) : (
							<>
								<Segment color="green" placeholder basic>
									<Image
										src={mediaPrev}
										size="medium"
										centered
										style={{ cursor: "pointer" }}
										onClick={() => inputRef.current.click()}
									/>
								</Segment>
							</>
						)}
					</div>
				</Segment>
			</Form.Field>
		</>
	);
}

export default DragImageUpload;

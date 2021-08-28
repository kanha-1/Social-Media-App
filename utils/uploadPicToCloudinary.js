import axios from "axios";
const uploadPic = async (media) => {
	try {
		const data = new FormData();
		data.append("file", media);
		data.append("upload_preset", "social_media");
		data.append("cloud_name", "dsseuwzzr");
		const response = axios.post(process.env.cloudinary_url, data);
		return response.data.url;
	} catch (error) {
		return;
	}
};
export default uploadPic;

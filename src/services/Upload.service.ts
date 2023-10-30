import { HttpClient } from "./HttpClient";




class UploadService {

	private endPoint = "/upload"


	uploadFiles(dir: 'banners' | 'avatars' | 'messages' | 'channels', formData: FormData) {
		return HttpClient.post(this.endPoint + "/" + dir, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			}
		});
	}


}

export default new UploadService()








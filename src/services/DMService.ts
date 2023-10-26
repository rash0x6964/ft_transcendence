import { HttpClient } from "./HttpClient";

class DMService {

	private endPoint = "/directMessage"

	getDMList() {
		return HttpClient.get(`${this.endPoint}/list`);
	}
}

export default new DMService()

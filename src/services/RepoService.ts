import { HttpClient } from "./HttpClient"

class RepoService {
  private channelEndPoint = "/repo"

  getSelectedProduct() {
    return HttpClient.get(`${this.channelEndPoint}`)
  }

  // getAllProductOfUser() {
  //   return HttpClient.get(`${this.channelEndPoint}/user`)
  // }

  updateRepo(body: any) {
    return HttpClient.post(`${this.channelEndPoint}`, body)
  }

}

export default new RepoService()

import { HttpClient } from "./HttpClient"

class RepoService {
  private channelEndPoint = "/repo"

  getSelectedProduct() {
    return HttpClient.get(`${this.channelEndPoint}`)
  }

  updateRepo(body: any) {
    return HttpClient.post(`${this.channelEndPoint}`, body)
  }

  getSkins() {
    return HttpClient.get(`${this.channelEndPoint}/skins`).then(
      (res) => res.data
    )
  }
}

export default new RepoService()

import { Repo } from "@/models/Repo.model"
import { HttpClient } from "./HttpClient"

class RepoService {
  private channelEndPoint = "/repo"

  getSelectedProduct(): Promise<Repo> {
    return HttpClient.get(`${this.channelEndPoint}`).then((res) => res.data)
  }

  // getAllProductOfUser() {
  //   return HttpClient.get(`${this.channelEndPoint}/user`)
  // }

  updateRepo(body: any) {
    return HttpClient.post(`${this.channelEndPoint}`, body).then(
      (res) => res.data
    )
  }
}

const repoService = new RepoService()

export default repoService

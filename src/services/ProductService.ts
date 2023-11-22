import { HttpClient } from "./HttpClient"
import Product from "@/models/Product.model"

class ProductService {
  private channelEndPoint = "/store"

  getProductList() {
    return HttpClient.get(`${this.channelEndPoint}/items`)
  }

  getAllProductOfUser() {
    return HttpClient.get(`${this.channelEndPoint}/user`)
  }

  assign(body: any) {
    return HttpClient.post(`${this.channelEndPoint}`, body)
  }
}

export default new ProductService()

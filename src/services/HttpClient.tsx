import env from "@/constants/constants"
import axios from "axios"
import cookieService from "./CookiesService"

const HttpClient = axios.create({
  baseURL: env.endPoint,
  // timeout: 5000,
  headers: { "Content-Type": "application/json" },
})

HttpClient.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${cookieService.getJwtCookie()}`
    return config
  },
  function (error) {
    console.log(error)
    return Promise.reject(error)
  }
)

HttpClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response && error.response.status == "401") {
      cookieService.deleteUserCookie()
      document.location = "/signin"
    }
    return Promise.reject(error)
  }
)

export { HttpClient }

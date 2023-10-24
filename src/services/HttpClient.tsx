import env from "@/environment/environment"
import axios from "axios"
import { getJwtCookie } from "./CookiesService"
import { useRouter } from "next/router"

const HttpClient = axios.create({
  baseURL: env.endPoint,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
})

HttpClient.interceptors.request.use(
  function (config) {
    //to be changed, local storage just for testing purposes
    config.headers["Authorization"] = `Bearer ${getJwtCookie()}`
    return config
  },
  function (error) {
    // Do something with request error
    console.log(error)
    return Promise.reject(error)
  }
)

HttpClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status == "401") document.location = "/signup"
    else return Promise.reject(error)
  }
)

export { HttpClient }

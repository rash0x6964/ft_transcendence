import axios from "axios"
import { HttpClient } from "./HttpClient"
import env from "@/environment/environment"
import cookieService from "./CookiesService"
import { ProviderToken } from "@/types/Auth"
import { UpdatePassword, UpdateUser } from "@/types/User"

const update = (userData: UpdateUser) => {
  return HttpClient.patch("/users", userData).then((res) => res.data)
}

const updatePassword = (passwordData: UpdatePassword) => {
  return HttpClient.patch("/users/password", passwordData).then(
    (res) => res.data
  )
}

const getCurrent = () => {
  return HttpClient.get("/users/current").then((res) => {
    return res.data
  })
}

const uploadPhoto = (formData: any, type: "banners" | "avatars") => {
  return axios({
    method: "post",
    url: `${env.endPoint}/upload/${type}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${cookieService.getJwtCookie()}`,
    },
  }).then((res) => res.data)
}

const getAccounts = () => {
  return HttpClient.get("/users/accounts").then((res) => res.data)
}

const createByProvider = (data: ProviderToken) => {
  return axios
    .post(`${env.endPoint}/provider/create`, data)
    .then((res) => res.data)
}

const addProvider = (data: ProviderToken) => {
  return HttpClient.post(`${env.endPoint}/provider/merge`, data).then(
    (res) => res.data
  )
}

const getById = (id: string) => {
  return HttpClient.get(`${env.endPoint}/users/${id}`).then((res) => res.data)
}

export default {
  getById,
  addProvider,
  createByProvider,
  getAccounts,
  uploadPhoto,
  getCurrent,
  updatePassword,
  update,
}

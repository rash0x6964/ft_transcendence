import axios from "axios"
import { HttpClient } from "./HttpClient"
import env from "@/environment/environment"
import { getJwtCookie } from "./CookiesService"
import { ProviderToken } from "@/types/Auth"
import { UpdatePassword, UpdateUser } from "@/types/User"
import User from "@/models/User.model"

export const update = (userData: UpdateUser) => {
  return HttpClient.patch("/users", userData).then((res) => res.data)
}

export const updatePassword = (passwordData: UpdatePassword) => {
  return HttpClient.patch("/users/password", passwordData).then(
    (res) => res.data
  )
}

export const getCurrent = (): Promise<User> => {
  return HttpClient.get("/users/current").then((res) => res.data)
}

export const uploadPhoto = (formData: any, type: "banners" | "avatars") => {
  return axios({
    method: "post",
    url: `${env.endPoint}/upload/${type}`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${getJwtCookie()}`,
    },
  }).then((res) => res.data)
}

export const getAccounts = () => {
  return HttpClient.get("/users/accounts").then((res) => res.data)
}

export const createByProvider = (data: ProviderToken) => {
  return axios
    .post(`${env.endPoint}/provider/create`, data)
    .then((res) => res.data)
}

export const addProvider = (data: ProviderToken) => {
  return HttpClient.post(`${env.endPoint}/provider/merge`, data).then(
    (res) => res.data
  )
}

export const getById = (id: string) => {
  return HttpClient.get(`${env.endPoint}/users/${id}`).then((res) => res.data)
}

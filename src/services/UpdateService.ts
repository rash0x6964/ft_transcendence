import { HttpClient } from "./HttpClient"

export const update = (userData: any) => {
  return HttpClient.patch("/users", userData).then((res) => res.data)
}

export const updatePassword = (passwordData: any) => {
  return HttpClient.patch("/users/password", passwordData).then(
    (res) => res.data
  )
}

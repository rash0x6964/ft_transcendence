import { HttpClient } from "./HttpClient"

export const update = (userData: any) => {
  return HttpClient.patch("/users", userData).then((res) => res.data)
}

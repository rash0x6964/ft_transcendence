import { HttpClient } from "./HttpClient"

export const signUp = (signUpData: any) => {
  return HttpClient
    .post(`/authentication/signUp`, signUpData)
    .then((res) => res.data)
}

export const signIn = (signInData: any) => {
	return HttpClient
	  .post(`/authentication/signIn`, signInData)
	  .then((res) => res.data)
  }

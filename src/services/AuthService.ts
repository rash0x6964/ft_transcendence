import env from "@/environment/environment"
import axios from "axios"
import { HttpClient } from "./HttpClient"

export const signUp = (signUpData: any) => {
  console.log(signUpData)
  return HttpClient
    .post(`/authentication/signUp`, signUpData)
    .then((res) => res.data)
}

export const signIn = (signInData: any) => {
	console.log(signInData)
	return HttpClient
	  .post(`/authentication/signIn`, signInData)
	  .then((res) => res.data)
  }

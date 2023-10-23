import env from "@/environment/environment"
import axios from "axios"

export const signUp = (signUpData: any) => {
  console.log(signUpData)
  return axios
    .post(`http://localhost:3001/authentication/signUp`, signUpData)
    .then((res) => res.data)
}

export const signIn = (signInData: any) => {
	console.log(signInData)
	return axios
	  .post(`http://localhost:3001/authentication/signIn`, signInData)
	  .then((res) => res.data)
  }
  
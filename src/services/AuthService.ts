import { SignInData, SignUpData } from "@/types/Auth"
import { HttpClient } from "./HttpClient"

const signUp = (signUpData: SignUpData) => {
  return HttpClient.post(`/authentication/signUp`, signUpData).then(
    (res) => res.data
  )
}

const signIn = (signInData: SignInData) => {
  return HttpClient.post(`/authentication/signIn`, signInData).then(
    (res) => res.data
  )
}

export default { signIn, signUp }

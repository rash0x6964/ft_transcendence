import { HttpClient } from "./HttpClient"

const activate2FA = () => {
  return HttpClient.post("/otpAauth/activate").then((res) => res.data)
}

const deactivate2FA = () => {
  return HttpClient.post("/otpAauth/deactivate").then((res) => res.data)
}

const verify2Fa = () => {
  return HttpClient.post("/otpAauth/verify").then((res) => res.data)
}

export default {
  activate2FA,
  deactivate2FA,
}

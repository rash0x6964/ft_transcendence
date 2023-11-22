import Cookies from "js-cookie"

const jwtCookieName = "USER"
const infoCookieName = "INFO"
const tfaCookieName = "TWO_AUTH_FACT"
const providerCookieName = "PROVIDER"

const setJwtCookie = (token: string) => {
  Cookies.set(jwtCookieName, token)
}

const deleteInfoCookie = () => {
  Cookies.remove(infoCookieName)
}

const deleteProviderCookie = () => {
  Cookies.remove(providerCookieName)
}

const delete2FACookie = () => {
  Cookies.remove(tfaCookieName)
}

const deleteUserCookie = () => {
  Cookies.remove(jwtCookieName)
}

const isLoggedIn = () => {
  return getJwtCookie() !== undefined
}

const getJwtCookie = () => Cookies.get(jwtCookieName)
const getInfoCookie = () => Cookies.get(infoCookieName)
const getProvdierCookie = () => Cookies.get(providerCookieName)
const get2FACookie = () => Cookies.get(tfaCookieName)

export default {
  isLoggedIn,
  setJwtCookie,
  deleteInfoCookie,
  deleteProviderCookie,
  getJwtCookie,
  getInfoCookie,
  getProvdierCookie,
  get2FACookie,
  delete2FACookie,
  deleteUserCookie,
}

const jwtCookieName = "USER"

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""

const setJwtCookie = (token: string) => {
  document.cookie = `${jwtCookieName}=${token}`
}

const deleteInfoCookie = () => {
  document.cookie = `INFO=`
}

const deleteProviderCookie = () => {
  document.cookie = `PROVIDER=`
}

const getJwtCookie = () => getCookieValue(jwtCookieName)
const getInfoCookie = () => getCookieValue("INFO")
const getProvdierCookie = () => getCookieValue("PROVIDER")

export default {
  setJwtCookie,
  deleteInfoCookie,
  deleteProviderCookie,
  getJwtCookie,
  getInfoCookie,
  getProvdierCookie,
}

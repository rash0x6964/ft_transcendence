const jwtCookieName = "USER"

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""

export const setJwtCookie = (token: string) => {
  document.cookie = `${jwtCookieName}=${token}`
}

export const deleteInfoCookie = () => {
  document.cookie = `INFO=`
}

export const deleteProviderCookie = () => {
  document.cookie = `PROVIDER=`
}

export const getJwtCookie = () => getCookieValue(jwtCookieName)
export const getInfoCookie = () => getCookieValue("INFO")
export const getProvdierCookie = () => getCookieValue("PROVIDER")

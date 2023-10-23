const jwtCookieName = "USER"

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""

export const setJwtCookie = (token: string) => {
  document.cookie = `${jwtCookieName}=${token}`
}

export const getJwtCookie = () => getCookieValue(jwtCookieName)

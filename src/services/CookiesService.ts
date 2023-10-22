const jwtCookieName = "USER"

const getCookieValue = (name: string) =>
  document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""

export const getJwtCookie = () => getCookieValue(jwtCookieName)

const jwtCookieName = "USER"

const getCookieValue = (name: string) =>
	document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)")?.pop() || ""

const setJwtCookie = (token: string) => {
	document.cookie = `${jwtCookieName}=${token};path=/`
}

const deleteInfoCookie = () => {
	document.cookie = `INFO=`
}

const deleteProviderCookie = () => {
	document.cookie = `PROVIDER=`
}

const delete2FACookie = () => {
	document.cookie = `TWO_AUTH_FACT=`
}
const deleteUserCookie = () => {
	document.cookie = `USER=`
}

const isLoggedIn = () => {
	return (getJwtCookie() != "" && getJwtCookie().length > 0)
}
const getJwtCookie = () => getCookieValue(jwtCookieName)
const getInfoCookie = () => getCookieValue("INFO")
const getProvdierCookie = () => getCookieValue("PROVIDER")
const get2FACookie = () => getCookieValue("TWO_AUTH_FACT") === "activated"

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

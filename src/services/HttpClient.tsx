import env from "@/environment/environment";
import axios from "axios";

const HttpClient = axios.create(
	{
		baseURL: env.endPoint,
		timeout: 1000,
		headers: { 'Content-Type': 'application/json' }
	}
)

HttpClient.interceptors.request.use(function (config) {
	//to be changed, local storage just for testing purposes
	config.headers["Authorization"] = `Bearer ${localStorage.getItem(env.jwtTokenKey)}`
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

export { HttpClient }

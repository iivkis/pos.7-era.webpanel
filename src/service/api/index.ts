import axios, {
	AxiosError,
	AxiosPromise,
	AxiosRequestConfig,
	AxiosRequestHeaders,
} from "axios";
import { store } from "../../store";
import { ServerError, ServerReponse } from "./api.types";

const baseHost = localStorage.getItem("base_host");

//alias for axios
const Request = axios;
Request.defaults.baseURL = (baseHost ? baseHost : "") + "/api/v1";

const Do = (request: AxiosPromise<any>): Promise<ServerReponse> => {
	return new Promise((resolse, reject) => {
		request
			.then(({ data }) => {
				resolse(data as ServerReponse);
			})
			.catch((err: AxiosError) => {
				if (err.response?.data) {
					reject(
						(err.response.data as ServerReponse).data as ServerError
					);
				} else {
					console.error(err);
				}
			});
	});
};

const OrganizationHeaders = (): AxiosRequestHeaders => {
	return {
		Authorization: store.state.OrganizationAPIKey,
	};
};

export { Request, Do, OrganizationHeaders };

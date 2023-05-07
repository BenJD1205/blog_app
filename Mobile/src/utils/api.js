import axios from "axios";
import config from "../config";

const publicAPI = axios.create({
	baseURL: `${config.backendURI}`,
});

export { publicAPI };

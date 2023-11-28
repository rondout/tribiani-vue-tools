import axios, { AxiosResponse } from "axios";
import { useRevalidation } from "./useRevalidation";
import {
  RevalidateBaseResponse,
  StartValidateParams,
  MsgCodeValidateParams,
  ImageCodeValidateParams,
  StartValidateResponse,
} from "..";

export const REVALIDATE_TRIGGER_CODE = 5001;

let baseURL = "https://gatewaytest.wygsy.com";
axios.defaults.baseURL = baseURL;

/**
 *
 * @param {AxiosResponse} response 后台返回来的response
 * @param {string} argBaseUrl 后台请求的网关地址
 * @returns
 */
export const interceptRevalidateResponse = (
  response: AxiosResponse<RevalidateBaseResponse>,
  argBaseUrl?: string
) => {
  if (argBaseUrl) {
    baseURL = argBaseUrl;
  }
  axios.defaults.baseURL = baseURL;
  if (response.data.code === REVALIDATE_TRIGGER_CODE) {
    const data = response.data.data;
    useRevalidation(data);
    return Promise.reject(response);
  }
};

axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    config.headers.satoken = window.localStorage.getItem("token");
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use((response) => {
  axios.defaults.baseURL = baseURL;
  interceptRevalidateResponse(response);
  return Promise.resolve(response);
});

export default axios;

export async function startValidate(params: StartValidateParams) {
  console.log("BASE_URL", axios.defaults.baseURL);
  try {
    axios.defaults.baseURL = baseURL;
    const data = await axios.post<StartValidateResponse>(
      "/base-platform/api/v1/safe/openSafe/start",
      params
    );
    console.log(data.data);
    return data;
  } catch (error) {}
}

export async function handleRevalidate(
  params: MsgCodeValidateParams | ImageCodeValidateParams
) {
  try {
    axios.defaults.baseURL = baseURL;
    const data = await axios.post(
      "/base-platform/api/v1/safe/openSafe/validate",
      params
    );
    return data;
  } catch (error) {}
}

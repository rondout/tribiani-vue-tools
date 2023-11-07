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

/**
 *
 * @param {AxiosResponse} response 后台返回来的response
 * @param {string} baseUrl 后台请求的网关地址
 * @returns
 */
export const interceptRevalidateResponse = (
  response: AxiosResponse<RevalidateBaseResponse>,
  baseUrl = "https://gatewaytest.wygsy.com"
) => {
  axios.defaults.baseURL = baseUrl;
  if (response.data.code === REVALIDATE_TRIGGER_CODE) {
    const data = response.data.data;
    useRevalidation(data);
    return Promise.reject(response);
  }
};

axios.defaults.baseURL = "https://gatewaytest.wygsy.com";

axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    config.headers.satoken = window.localStorage.getItem("token");
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use((response) => {
  interceptRevalidateResponse(response);
  return Promise.resolve(response);
});

export default axios;

export async function startValidate(params: StartValidateParams) {
  try {
    const data = await axios.post<StartValidateResponse>(
      "/wygtech-oa/api/v1/safe/openSafe/start",
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
    const data = await axios.post(
      "/wygtech-oa/api/v1/safe/openSafe/validate",
      params
    );
    return data;
  } catch (error) {}
}

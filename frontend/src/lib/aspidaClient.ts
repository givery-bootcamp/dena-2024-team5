import aspida from "@aspida/fetch";
import api from "../../api/$api";

const fetchConfig = (token: string) => {
  return {
    // credentials: "include",
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    throwHttpErrors: true, // throw an error on 4xx/5xx, default is false
    headers: {
      Cookie: `jwt=${token}`,
    },
  };
};

export const aspidaClient = (jwtToken: string) => {
  return api(aspida(fetch, fetchConfig(jwtToken)));
};

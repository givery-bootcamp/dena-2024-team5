import aspida from "@aspida/fetch";
import api from "../../api/$api";

const fetchConfig = {
  // credentials: "include",
  baseURL: "http://localhost:9000",
  throwHttpErrors: true, // throw an error on 4xx/5xx, default is false
  headers: {
    credentials: "include",
  },
};

export const aspidaClient = api(aspida(fetch, fetchConfig));

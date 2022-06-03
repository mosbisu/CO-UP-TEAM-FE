import axios from "axios";

const instance = axios.create({
  // 쿠키 정보를 올바르게 가져오기 withCredentials
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    "Access-Control-Allow-Origin": "*",
  },
});

export { instance };

import axios from "axios";
import { transData } from "./util";

// axios 配置
axios.defaults.timeout = 20000;
axios.defaults.baseURL = "/";

// 返回状态判断
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      // 对返回值进行数据处理
      res.data = transData(res.data);

      return res;
    }

    return Promise.reject(res);
  },
  error => {
    return Promise.reject(error);
  }
);

export function post(url: string, params: any) {
  let headers = { "Content-Type": "application/json;charset=UTF-8" };

  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: headers
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function upload(url: string, formData: any) {
  let headers = { "Content-Type": "multipart/form-data" };

  return new Promise((resolve, reject) => {
    axios
      .post(url, formData, {
        headers: headers,
        timeout: 600000
      })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function get(url: string, params: any) {
  let headers = {};

  if (params) {
    params = Object.assign(params, { _t: new Date().getTime() });
  } else {
    params = { _t: new Date().getTime() };
  }

  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params, headers: headers })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

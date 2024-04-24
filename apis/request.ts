import { Message } from "@arco-design/web-vue";
// export const token = useCookie("token");
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjEsImV4cCI6MTcxNjQ2MTQ3NiwibmJmIjoxNzEzNzgzMDc2LCJpYXQiOjE3MTM3ODMwNzZ9.tAHVca-yx2AnLrvzZbUNrSY_69K0M3ZCswLA68RNKUI";
export const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

const handleResponse = (status: number, message?: string) => {
  // console.log("===handelResponse", status);

  switch (status) {
    case 200: {
      return true;
    }
    case 500: {
      Message.error(message ?? "服务器错误");
      return false;
    }
    case 401: {
      Message.error("请先登录");
      return false;
    }
    case 402: {
      Message.error("发送次数已达上限或余额不足");
      return false;
    }
    case 403: {
      Message.error("禁止发送违禁词");
      return false;
    }
    case 405: {
      Message.error("提交信息有误");
      return false;
    }
    default: {
      Message.error(message ?? "");
      return false;
    }
  }
};

export const originFetch = (url: string, options?: any): Promise<any> => {
  const {
    public: { baseUrl, prefixUrl },
  } = useRuntimeConfig();
  const reqUrl = baseUrl + prefixUrl + url;
  return new Promise(async (resolve, reject) => {
    fetch(reqUrl, {
      headers,
      ...options,
    })
      .then((res) => {
        if (handleResponse(res.status)) {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const request = (url: string, options?: any): Promise<any> => {
  const {
    public: { baseUrl, prefixUrl },
  } = useRuntimeConfig();
  const reqUrl = baseUrl + prefixUrl + url;
  return new Promise(async (resolve, reject) => {
    useFetch(reqUrl, {
      ...options,
      headers,
    })
      .then((res: any) => {
        const { data: fetchRes, error } = res;
        if (!fetchRes._rawValue) {
          // 这里处理错误回调
          if (error.value.data.message == "检测到多端登录，请重新登录") {
            const token = useCookie("token");
            token.value = "";
            let router = useRouter();
            router.push("/login");
          }
          error.value && Message.error(error.value.data.message);
          reject(fetchRes.value);
        } else {
          const data = fetchRes._rawValue;
          // console.log(reqUrl, data);
          // todo 删除
          if (data.status === 200) {
            resolve(data);
            return;
          }
          if (handleResponse(data.status, data.message)) {
            resolve(data);
          } else {
            reject(data);
          }
        }
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export default new (class Http {
  get(url: string, params?: any): Promise<any> {
    return request(url, { method: "get", params });
  }

  post(url: string, body?: any): Promise<any> {
    return request(url, { method: "post", body: JSON.stringify(body) });
  }
  postFetch(url: string, body?: any, options?: any): Promise<any> {
    return originFetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  }

  put(url: string, body?: any): Promise<any> {
    return request(url, { method: "put", body });
  }

  delete(url: string, body?: any): Promise<any> {
    return request(url, { method: "delete", body });
  }
})();

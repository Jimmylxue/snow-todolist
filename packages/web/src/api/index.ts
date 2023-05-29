import { todoListAuth } from '@/hooks/useAuth';
import { message } from 'antd';
import axios, {
  AxiosInstance,
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { debounce } from 'lodash';
// import { ElMessage } from 'element-plus'
// 数据返回的接口
// 定义请求响应参数，不含data
interface Result {
  code: number;
  msg: string;
}

export type ClientError = {
  code: number;
  message: string;
};

// 请求响应参数，包含data
interface ResultData<T = any> extends Result {
  result?: T;
}
const URL: string = import.meta.env.VITE_APP_API_BASE_URL;
// const URL: string = 'http://127.0.0.1:9999'
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 600, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 200, // 请求成功
}
const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
  // 跨域时候允许携带凭证
  // withCredentials: true,
};

type TResponse = {
  code: number;
  data: any;
  message: string;
};

const handle401 = debounce(() => {
  message.error('未登录 请重新登录');
  todoListAuth.setShouldLoginStatus(true);
}, 500);

class RequestHttp {
  // 定义成员变量并指定类型
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    // 实例化axios
    this.service = axios.create(config);
    /**
     * 请求拦截器
     * 客户端发送请求 -> [请求拦截器] -> 服务器
     * token校验(JWT) : 接受服务器返回的token,存储到vuex/pinia/本地储存当中
     */

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('token') || '';
        return {
          ...config,
          headers: {
            Authorization: 'Bearer ' + token, // 请求头中携带token信息
          },
        };
      },
      (error: AxiosError) => {
        // 请求报错
        Promise.reject(error);
      },
    );
    /**
     * 响应拦截器
     * 服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
     */

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        // 请求成功时
        const { data, config } = response; // 解构
        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', ''); // router.replace({ //   path: '/login' // })
          return Promise.reject(data);
        } // 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
        if (data.code && data.code !== RequestEnums.SUCCESS) {
          // ElMessage.error(data) // 此处也可以使用组件提示报错信息
          message.error(data.message || data.result);
          return data;
        }

        return data;
      },
      (error: AxiosError<TResponse>) => {
        // 请求失败时
        const { response } = error;
        if (response?.status === 401) {
          handle401();
          return;
        }
        if (response) {
          this.handleCode(response.status, response.data);
        }
        if (!window.navigator.onLine) {
          // ElMessage.error('网络连接失败') // 可以跳转到错误页面，也可以不做操作 // return router.replace({ //   path: '/404' // });
        }
      },
    );
  }

  // code 是 http 请求的状态
  handleCode(code: number, data: TResponse): void {
    switch (code) {
      case 401:
        message.error('登录已过期，请重新登录');
        break;
      case 404:
        message.error(data.message);
        break;
      case 400:
        message.error(data.message);
        break;
      default:
        // ElMessage.error('请求失败')
        break;
    }
  }

  // 常用方法封装
  get<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.get(url, { params });
  }
  post<T, P>(url: string, params?: P): Promise<T> {
    return this.service.post(url, params);
  }
  put<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.put(url, params);
  }
  delete<T>(url: string, params?: object): Promise<ResultData<T>> {
    return this.service.delete(url, { params });
  }
}

// 导出一个实例对象
const request = new RequestHttp(config);

export function get<T>(url: string) {
  return request.get<T>(url);
}

export function post<T, P>(url: string, params: P) {
  return request.post<T, P>(url, params);
}

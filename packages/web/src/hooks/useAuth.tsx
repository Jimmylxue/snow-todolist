import {
  TLoginUser,
  useSendMail,
  useUserLogin,
  useUserLoginByMail,
  useUserRegister,
  useUserRegisterByMail,
} from '@/api/login';
import {
  TUserRegisterByMailParams,
  TUserRegisterParams,
} from '@/api/login/type';
import { config } from '@/config/react-query';
import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { useEffect } from 'react';
import { QueryClient } from 'react-query';

class Auth {
  shouldLogin: boolean = false;

  private queryClient?: QueryClient;

  user?: TLoginUser;

  constructor() {
    makeAutoObservable(this);
  }

  setShouldLoginStatus(status: boolean) {
    this.shouldLogin = status;
  }

  setLoginUser(user?: TLoginUser) {
    this.user = user;
    if (!user) {
      this.queryClient?.clear();
    }
  }

  saveQueryClient(client: QueryClient) {
    this.queryClient = client;
  }
}

export const todoListAuth = new Auth();

export function useUser() {
  const { mutateAsync } = useUserLogin();
  const { mutateAsync: registerFn } = useUserRegister();
  const { mutateAsync: loginByMailFn } = useUserLoginByMail();
  const { mutateAsync: registerByMailFn } = useUserRegisterByMail();
  const { mutateAsync: sendMailCode } = useSendMail();
  const { queryClient } = config();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('login-user')!);
      if (user) {
        todoListAuth.setLoginUser(user);
      } else {
        todoListAuth.setShouldLoginStatus(true);
      }
    } catch {
      todoListAuth.setShouldLoginStatus(true);
    }
  }, []);

  useEffect(() => {
    if (queryClient) {
      todoListAuth.saveQueryClient(queryClient);
    }
  }, [queryClient]);

  const login = async (params: { phone: string; password: string }) => {
    const res = await mutateAsync({
      phone: params.phone,
      password: params.password,
    });
    if (res.code === 200) {
      message.success('登录成功');
      localStorage.setItem('token', res.result.token);
      localStorage.setItem('login-user', JSON.stringify(res.result.user));
      todoListAuth.setLoginUser(res.result.user);
      return true;
    }
    return false;
  };

  const loginByMail = async (params: { mail: string; code: string }) => {
    const res = await loginByMailFn(params);
    if (res.code === 200) {
      message.success('登录成功');
      localStorage.setItem('token', res.result.token);
      localStorage.setItem('login-user', JSON.stringify(res.result.user));
      todoListAuth.setLoginUser(res.result.user);
      return true;
    }
    return false;
  };

  const logOut = () => {
    todoListAuth.user = undefined;
    localStorage.setItem('token', '');
    localStorage.setItem('login-user', '');
    message.success('已退出');
    todoListAuth.setShouldLoginStatus(true);
    queryClient.clear();
  };

  const register = async (params: TUserRegisterParams) => {
    const res = await registerFn(params);
    if (res.code === 200) {
      message.success('注册成功');
      return true;
    }
    return false;
  };

  const registerByMail = async (params: TUserRegisterByMailParams) => {
    const res = await registerByMailFn(params);
    if (res.code === 200) {
      message.success('注册成功');
      localStorage.setItem('token', res.result.token);
      localStorage.setItem('login-user', JSON.stringify(res.result.user));
      todoListAuth.setLoginUser(res.result.user);
      return true;
    }
    return false;
  };

  const showLoginModal = () => {
    todoListAuth.setShouldLoginStatus(true);
  };

  const checkUserLoginBeforeFn = () => {
    if (todoListAuth.user?.id) {
      return true;
    }
    showLoginModal();
    return false;
  };

  return {
    user: todoListAuth.user,
    logOut,
    login,
    showLoginModal,
    register,
    checkUserLoginBeforeFn,
    loginByMail,
    registerByMail,
    sendMailCode,
  };
}

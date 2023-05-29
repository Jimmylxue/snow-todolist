import { TLoginUser, useUserLogin, useUserRegister } from '@/api/login';
import { TUserRegisterParams } from '@/api/login/type';
import { config } from '@/config/react-query';
import { message } from 'antd';
import { makeAutoObservable } from 'mobx';
import { useEffect } from 'react';

class Auth {
  shouldLogin: boolean = false;

  user?: TLoginUser;

  constructor() {
    makeAutoObservable(this);
  }

  setShouldLoginStatus(status: boolean) {
    this.shouldLogin = status;
  }

  setLoginUser(user: TLoginUser) {
    this.user = user;
  }
}

export const todoListAuth = new Auth();

export function useUser() {
  const { mutateAsync } = useUserLogin();
  const { mutateAsync: registerFn } = useUserRegister();
  const { queryClient } = config();

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('login-user')!);
      if (user) {
        todoListAuth.setLoginUser(user);
      }
    } catch {}
  }, []);

  const login = async (params: { phone: string; password: string }) => {
    const res = await mutateAsync({
      phone: params.phone,
      password: params.password,
    });
    if (res.code === 200) {
      message.success('登录成功');
      localStorage.setItem('token', res.result.token);
      localStorage.setItem('login-user', JSON.stringify(res.result.user));
      console.log('here', res.result.user);
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
  };
}

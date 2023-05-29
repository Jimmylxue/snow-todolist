import React from 'react';
import axios from 'axios';
import { act, render, screen } from '@testing-library/react';
import { AuthButton } from '../AuthButton';

describe('>>> AuthButton Mock Axios', () => {
  it('可以正确展示普通用户按钮内容', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { userType: 'USER' },
    });

    await act(async () => render(<AuthButton>登录</AuthButton>));

    expect(await screen.findByText('普通用户登录')).toBeDefined();
  });

  it('可以正确展示管理员按钮内容', async () => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({
      data: { userType: 'ADMIN' },
    });

    await act(async () => render(<AuthButton>登录</AuthButton>));

    expect(await screen.findByText('管理员登录')).toBeDefined();
  });
});

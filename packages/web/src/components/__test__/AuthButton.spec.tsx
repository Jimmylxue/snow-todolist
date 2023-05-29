import { act, render, screen } from '@testing-library/react';
import { AuthButton } from '../AuthButton';
import React from 'react';

describe('>>> AuthButton', () => {
  it('可以正常展示', async () => {
    await act(async () => render(<AuthButton>登录</AuthButton>));
    expect(screen.getByText('登录')).toBeDefined();
  });
});

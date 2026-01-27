import { config } from '@/config/react-query';
import { todoListAuth, useUser } from '@/hooks/useAuth';
import { encrypt } from '@/utils/encrypt';
import { isQQMail } from '@/utils/util';
import { Button, Form, Input, Modal, message } from 'antd';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  SafetyOutlined,
} from '@ant-design/icons';

type TProps = {
  show?: boolean;
  onClose: () => void;
};

export const Login = observer(({ show, onClose }: TProps) => {
  const { login, register, loginByMail, registerByMail, sendMailCode } =
    useUser();
  const { queryClient } = config();
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState<'login' | 'register'>('login');
  const [handleType, setHandleType] = useState<'phone' | 'mail'>('mail');

  useEffect(() => {
    if (show) {
      setModalType('login');
    } else {
      form.resetFields();
    }
  }, [show]);

  return (
    <Modal
      title={
        <div className='text-xl font-bold text-gray-800 flex items-center gap-2'>
          <span className='w-1 h-6 bg-[var(--primary-color)] rounded-full block'></span>
          {modalType === 'login' ? '欢迎回来' : '注册账号'}
        </div>
      }
      open={todoListAuth.shouldLogin}
      onCancel={onClose}
      forceRender
      footer={null}
      width={420}
      centered
      className='snow-login-modal'
      maskStyle={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}>
      <div className='mt-6'>
        <Form
          form={form}
          name='basic'
          layout='vertical'
          initialValues={{ remember: true }}
          requiredMark={false}
          onFinish={async () => {
            const params = form.getFieldsValue();
            if (modalType === 'login') {
              let status;
              if (handleType === 'phone') {
                params.password = await encrypt(params.password);
                status = await login(params);
              } else {
                status = await loginByMail(params);
              }

              if (status) {
                // 重新触发一些请求
                setTimeout(() => {
                  queryClient.invalidateQueries('userTask');
                  queryClient.invalidateQueries('taskType');
                }, 800);

                onClose();
              }
            } else {
              let status;
              if (handleType === 'phone') {
                params.password = btoa(params.password + 'snow-todoList');
                status = await register(params);
              } else {
                status = await registerByMail(params);
                onClose();
              }
              if (status) {
                form.resetFields();
                setModalType('login');
              }
            }
          }}
          autoComplete='off'>
          {modalType === 'register' && (
            <Form.Item
              name='username'
              rules={[{ required: true, message: '请输入用户名!' }]}>
              <Input
                prefix={<UserOutlined className='text-gray-400' />}
                placeholder='设置用户名'
                className='h-12 rounded-xl bg-gray-50 border-b-2 border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] hover:bg-white focus:bg-white transition-all'
              />
            </Form.Item>
          )}

          {handleType === 'mail' && (
            <>
              <Form.Item required className='mb-4'>
                <Form.Item
                  name='mail'
                  noStyle
                  rules={[
                    { required: true, message: '请输入qq邮箱地址' },
                    {
                      pattern: /^[1-9]\d{4,10}@qq\.com$/,
                      message: '请输入正确的qq邮箱地址',
                    },
                  ]}>
                  <Input
                    prefix={<MailOutlined className='text-gray-400' />}
                    placeholder='QQ邮箱地址'
                    className='h-12 rounded-xl bg-gray-50 border-b-2 border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] hover:bg-white focus:bg-white transition-all'
                    suffix={
                      <Button
                        type='link'
                        size='small'
                        className='text-[var(--primary-color)] font-medium p-0 h-auto'
                        onClick={debounce(async () => {
                          const mail = form.getFieldValue('mail');
                          if (!isQQMail(mail)) {
                            message.error('请输入正确的qq邮箱地址');
                            return;
                          }
                          await sendMailCode({ mail });
                          message.success('验证码发送成功，有效期10分钟');
                          console.log('mail', mail);
                        }, 500)}>
                        获取验证码
                      </Button>
                    }
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item
                name='code'
                rules={[{ required: true, message: '请输入邮箱验证码!' }]}>
                <Input
                  maxLength={6}
                  prefix={<SafetyOutlined className='text-gray-400' />}
                  placeholder='验证码'
                  className='h-12 rounded-xl bg-gray-50 border-b-2 border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] hover:bg-white focus:bg-white transition-all'
                />
              </Form.Item>
            </>
          )}

          {handleType === 'phone' && (
            <>
              <Form.Item
                name='phone'
                rules={[
                  { required: true, message: '请输入手机号!' },
                  {
                    pattern:
                      /^1(3[0-9]|4[01456879]|5[0-3,5-9]|6[2567]|7[0-8]|8[0-9]|9[0-3,5-9])\d{8}$/,
                    message: '请输入正确的手机号',
                  },
                ]}>
                <Input
                  maxLength={11}
                  prefix={<MobileOutlined className='text-gray-400' />}
                  placeholder='手机号码'
                  className='h-12 rounded-xl bg-gray-50 border-b-2 border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] hover:bg-white focus:bg-white transition-all'
                />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: '请输入密码!' },
                  { min: 6, message: '密码最少6位' },
                  { max: 12, message: '密码最多12位' },
                ]}>
                <Input.Password
                  maxLength={12}
                  prefix={<LockOutlined className='text-gray-400' />}
                  placeholder='密码'
                  className='h-12 rounded-xl bg-gray-50 border-b-2 border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] hover:bg-white focus:bg-white transition-all'
                />
              </Form.Item>
            </>
          )}

          <Form.Item className='mt-8 mb-0'>
            <Button
              type='primary'
              htmlType='submit'
              block
              className='h-12 rounded-xl text-base font-medium bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)] border-none shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all'>
              {modalType === 'login' ? '立即登录' : '立即注册'}
            </Button>

            <div className='flex justify-between items-center mt-4 text-sm'>
              <span
                className='text-gray-400 cursor-pointer hover:text-gray-600 transition-colors'
                onClick={() => {
                  form.resetFields();
                  setHandleType(handleType === 'mail' ? 'phone' : 'mail');
                }}>
                切换{handleType === 'mail' ? '手机' : '邮箱'}登录
              </span>
              <span
                className='text-[var(--primary-color)] cursor-pointer font-medium hover:opacity-80 transition-opacity'
                onClick={() => {
                  form.resetFields();
                  setModalType((val) =>
                    val === 'login' ? 'register' : 'login',
                  );
                }}>
                {modalType === 'login' ? '注册新账号' : '已有账号？登录'}
              </span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
});

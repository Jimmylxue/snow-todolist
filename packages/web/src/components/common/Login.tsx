import { config } from '@/config/react-query';
import { todoListAuth, useUser } from '@/hooks/useAuth';
import { encrypt } from '@/utils/encrypt';
import { isQQMail } from '@/utils/util';
import { Button, Form, Input, Modal, message } from 'antd';
import { debounce } from 'lodash';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

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
      title={modalType === 'login' ? '用户登录' : '用户注册'}
      open={todoListAuth.shouldLogin}
      onCancel={onClose}
      forceRender
      footer={null}>
      <Form
        form={form}
        name='basic'
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
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
            label='用户名'
            name='username'
            rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder='请输入用户名' />
          </Form.Item>
        )}

        {handleType === 'mail' && (
          <>
            <Form.Item label='qq邮箱' required>
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
                  placeholder='请输入qq邮箱地址'
                  addonAfter={
                    <div
                      className=' cursor-pointer'
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
                      发送
                    </div>
                  }
                />
              </Form.Item>
            </Form.Item>
            <Form.Item
              label='验证码'
              name='code'
              rules={[{ required: true, message: '请输入邮箱验证码!' }]}>
              <Input maxLength={6} placeholder='请输入邮箱验证码' />
            </Form.Item>
          </>
        )}

        {handleType === 'phone' && (
          <>
            <Form.Item
              label='手机号'
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
                placeholder='未接入sms服务，使用一个唯一手机号即可'
              />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码最少6位' },
                { max: 12, message: '密码最多12位' },
              ]}>
              <Input.Password maxLength={12} placeholder='请输入用户密码' />
            </Form.Item>
          </>
        )}

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <div className=' flex justify-between items-center'>
            {modalType === 'login' ? (
              <Button type='primary' htmlType='submit'>
                登录
              </Button>
            ) : (
              <Button type='primary' htmlType='submit'>
                注册
              </Button>
            )}

            <Button
              type='link'
              onClick={() => {
                form.resetFields();
                setModalType((val) => (val === 'login' ? 'register' : 'login'));
              }}>
              {modalType === 'login' ? '没有账号，立即注册' : '返回登录'}
            </Button>
          </div>

          {/* <Button
            type='link'
            onClick={() => {
              form.resetFields();
              setHandleType(handleType === 'mail' ? 'phone' : 'mail');
            }}>
            {handleType === 'mail' ? '手机' : '邮箱'}登录
          </Button> */}
        </Form.Item>
      </Form>
    </Modal>
  );
});

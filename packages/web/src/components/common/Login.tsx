import { config } from '@/config/react-query';
import { useUser } from '@/hooks/useAuth';
import { Button, Form, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

type TProps = {
  show: boolean;
  onClose: () => void;
};

export function Login({ show, onClose }: TProps) {
  const { login, register } = useUser();
  const { queryClient } = config();
  const [form] = Form.useForm();
  const [modalType, setModalType] = useState<'login' | 'register'>('login');

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
      open={show}
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
            const status = await login(params);
            if (status) {
              // 重新触发一些请求
              queryClient.invalidateQueries('userTask');
              queryClient.invalidateQueries('taskType');
              onClose();
            }
          } else {
            const status = await register(params);
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
            <Input />
          </Form.Item>
        )}

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
          <Input maxLength={11} />
        </Form.Item>

        <Form.Item
          label='密码'
          name='password'
          rules={[
            { required: true, message: '请输入密码!' },
            { min: 6, message: '密码最少6位' },
            { max: 12, message: '密码最多12位' },
          ]}>
          <Input.Password maxLength={12} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
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
        </Form.Item>
      </Form>
    </Modal>
  );
}

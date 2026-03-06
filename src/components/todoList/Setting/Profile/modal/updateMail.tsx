import { TLoginUser, useSendMail } from '@/api/login';
import { isQQMail } from '@/utils/util';
import { Alert, Button, Form, Input, Modal, Space, message } from 'antd';
import { useEffect, useState } from 'react';

type TProps = {
  initData: TLoginUser;
  isChangeMail?: boolean;
  open: boolean;
  onOk: (value: any) => void;
  onCancel: () => void;
};

export function UpdateMail({
  initData,
  isChangeMail,
  open,
  onOk,
  onCancel,
}: TProps) {
  const [form] = Form.useForm();

  const [count, setCount] = useState<number>(60);

  const { mutateAsync } = useSendMail();

  const QQMailValidation = (_: any, value: any, callback: any) => {
    const pattern = /^[1-9]\d{4,10}@qq\.com$/;
    if (!value) {
      callback('请输入邮箱地址');
    } else if (!pattern.test(value)) {
      callback('请输入正确的邮箱地址');
    } else {
      callback();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ mail: initData.mail });
  }, [initData]);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  useEffect(() => {
    if (count === 60) {
      return;
    }
    if (count === 0) {
      setCount(60);
      return;
    }
    setTimeout(() => {
      setCount((count) => --count);
    }, 1000);
  }, [count]);

  return (
    <Modal
      title={isChangeMail ? '更改邮箱' : '绑定邮箱'}
      open={open}
      cancelText='取消'
      okText='确定'
      onOk={() => {
        form.submit();
      }}
      onCancel={onCancel}>
      <Form
        form={form}
        name='trigger'
        style={{ maxWidth: 600 }}
        layout='vertical'
        autoComplete='off'
        onFinish={(values) => {
          onOk(values);
        }}>
        <Alert message='暂时仅支持qq邮箱' />

        {isChangeMail && (
          <Form.Item
            hasFeedback
            label='原邮箱'
            name='mail'
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入邮箱' },
              { validator: QQMailValidation },
            ]}>
            <Input placeholder='请输入邮箱' />
          </Form.Item>
        )}

        <div className=' flex items-center'>
          <Form.Item
            className=' flex-grow'
            hasFeedback
            label='绑定新邮箱'
            name='newMail'
            rules={[{ validator: QQMailValidation }]}>
            <Input className=' w-full' placeholder='请输入邮箱' />
          </Form.Item>
          <Button
            className=' mt-1'
            type='primary'
            disabled={count !== 60}
            onClick={async () => {
              const mail = form.getFieldValue('newMail');
              if (!isQQMail(mail)) {
                message.error('请输入正确的邮箱地址');
                return;
              }
              await mutateAsync({
                mail,
              });
              message.success('发送成功，请前往邮箱获取验证码');
              setCount((count) => --count);
            }}>
            {count === 60 ? '发送验证码' : `${count}秒后重发`}
          </Button>
        </div>
        <Form.Item
          className=' flex-grow'
          hasFeedback
          label='验证码'
          name='code'
          rules={[
            { required: true, message: '请输入邮箱验证码' },
            { max: 6, min: 6, message: '请输入有效的6位验证码' },
          ]}>
          <Input className=' w-full' placeholder='请输入邮箱验证码' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

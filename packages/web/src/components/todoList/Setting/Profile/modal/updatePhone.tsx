import { TLoginUser } from '@/api/login';
import { Alert, Form, Input, Modal } from 'antd';
import { useEffect } from 'react';

type TProps = {
  initData: TLoginUser;
  isChangePhone?: boolean;
  open: boolean;
  onOk: (value: any) => void;
  onCancel: () => void;
};

export function UpdatePhone({
  initData,
  isChangePhone,
  open,
  onOk,
  onCancel,
}: TProps) {
  const [form] = Form.useForm();

  const PhoneNumberValidation = (_: any, value: any, callback: any) => {
    const pattern = /^1\d{10}$/;
    if (!value) {
      callback('请输入手机号码');
    } else if (!pattern.test(value)) {
      callback('请输入正确的手机号码');
    } else {
      callback();
    }
  };

  useEffect(() => {
    form.setFieldsValue({ phone: initData.phone });
  }, [initData]);

  return (
    <Modal
      title={isChangePhone ? '更改手机号' : '绑定手机号'}
      open={open}
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
        <Alert message='暂未接入SMS短信服务，手机号仅作为登录账号使用' />

        {isChangePhone && (
          <Form.Item
            hasFeedback
            label='原手机号~'
            name='phone'
            validateTrigger='onBlur'
            rules={[
              { required: true, message: '请输入手机号' },
              { validator: PhoneNumberValidation },
            ]}>
            <Input placeholder='请输入手机号' />
          </Form.Item>
        )}

        <Form.Item
          hasFeedback
          label='绑定手机号'
          name='newPhone'
          rules={[
            { required: true, message: '请输入手机号' },
            { validator: PhoneNumberValidation },
          ]}>
          <Input placeholder='请输入手机号' />
        </Form.Item>
      </Form>
    </Modal>
  );
}

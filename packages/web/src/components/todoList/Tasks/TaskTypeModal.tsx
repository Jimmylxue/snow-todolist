import { Button, Form, Input, Modal, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useAddTaskType, useUpdateTaskType } from '@/api/todolist/taskType';
import { config } from '@/config/react-query';
import { TaskType } from '@/api/todolist/taskType/type';

type TProps = {
  type: 'ADD' | 'EDIT';
  typeInfo?: TaskType;
  show: boolean;
  onCancel: () => void;
};

export const TaskTypeModal = ({ type, show, onCancel, typeInfo }: TProps) => {
  const { mutateAsync } = useAddTaskType();
  const { mutateAsync: updateTaskType } = useUpdateTaskType();
  const { queryClient } = config();
  const [form] = Form.useForm();
  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
  }, [show]);

  useEffect(() => {
    if (typeInfo?.typeId) {
      form.setFieldsValue({
        typeName: typeInfo.typeName,
        desc: typeInfo.desc,
      });
    }
  }, [typeInfo]);
  return (
    <Modal
      title={type === 'ADD' ? '添加任务类型' : '编辑任务类型'}
      open={show}
      okText={type === 'ADD' ? '添加类型' : '编辑类型'}
      cancelText={'取消'}
      forceRender
      onCancel={onCancel}
      footer={
        <div className='flex justify-end w-full'>
          <Button type='primary' onClick={form.submit}>
            {' '}
            {type === 'ADD' ? '添加类型' : '编辑类型'}
          </Button>
        </div>
      }>
      <Form
        form={form}
        name='horizontal_login'
        onFinish={async () => {
          const params = form.getFieldsValue();
          if (type === 'ADD') {
            const res = await mutateAsync(params);
            if (res.code === 200) {
              message.success('操作成功');
              queryClient.invalidateQueries('taskType');
              onCancel();
            }
          } else {
            const updateParams = { ...params, typeId: typeInfo?.typeId };
            const res = await updateTaskType(updateParams);
            if (res.code === 200) {
              message.success('操作成功');
              queryClient.invalidateQueries('taskType');
              onCancel();
            }
          }
        }}>
        <Form.Item
          name='typeName'
          rules={[{ required: true, message: '请输入类型名称!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='类型名称'
          />
        </Form.Item>
        <Form.Item
          name='desc'
          rules={[{ required: true, message: '请输入类型描述!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='类型描述'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

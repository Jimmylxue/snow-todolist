import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useAddTaskType, useUpdateTaskType } from '@/api/todolist/taskType';
import { config } from '@/config/react-query';
import { TaskType } from '@/api/todolist/taskType/type';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';
type TProps = {
  type: 'ADD' | 'EDIT';
  typeInfo?: TaskType;
  show: boolean;
  onCancel: () => void;
};

const { Option } = Select;

export const TaskTypeModal = ({ type, show, onCancel, typeInfo }: TProps) => {
  const { mutateAsync } = useAddTaskType();
  const { mutateAsync: updateTaskType } = useUpdateTaskType();
  const { queryClient } = config();
  const [form] = Form.useForm();
  const iconList = Object.keys(icons).filter((item) => {
    // @ts-ignore
    return typeof icons[item] === 'object';
  });
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
        themeColor: typeInfo.themeColor,
        icon: typeInfo.icon,
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
              onCancel();
              setTimeout(() => {
                queryClient.invalidateQueries('taskType');
              }, 500);
            }
          } else {
            const updateParams = { ...params, typeId: typeInfo?.typeId };
            const res = await updateTaskType(updateParams);
            if (res.code === 200) {
              message.success('操作成功');
              onCancel();
              setTimeout(() => {
                queryClient.invalidateQueries('taskType');
              }, 500);
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
        <Space>
          <Form.Item name='icon'>
            <Select
              placeholder={'请选择图标'}
              showSearch
              allowClear
              style={{ width: 200 }}
              onChange={(val) => {
                console.log(val);
              }}>
              {iconList.map((item) => {
                return (
                  <Option value={item} key={item}>
                    <Icon
                      component={(icons as any)?.[item]}
                      style={{ marginRight: '8px' }}
                    />
                    {item}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item name='themeColor'>
            <Input
              type='color'
              style={{ width: 100 }}
              placeholder='请选择主题色'
            />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

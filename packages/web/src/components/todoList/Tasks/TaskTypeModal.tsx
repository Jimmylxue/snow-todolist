import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useAddTaskType, useUpdateTaskType } from '@/api/todolist/taskType';
import { config } from '@/config/react-query';
import { TaskType } from '@/api/todolist/taskType/type';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';
import './TaskTypeModal.less';

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
      wrapClassName='snow-task-type-modal'
      width={480}
      footer={
        <div className='flex justify-end w-full'>
          <Button
            onClick={onCancel}
            className='mr-2 rounded-lg border-none bg-gray-100 text-gray-500 hover:bg-gray-200'>
            取消
          </Button>
          <Button
            type='primary'
            onClick={form.submit}
            className='rounded-lg shadow-md'>
            {type === 'ADD' ? '立即添加' : '保存修改'}
          </Button>
        </div>
      }>
      <Form
        form={form}
        layout='vertical'
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
          label='类型名称'
          rules={[{ required: true, message: '请输入类型名称!' }]}>
          <Input
            prefix={
              <UserOutlined className='site-form-item-icon text-gray-400' />
            }
            placeholder='例如：工作、学习、生活'
            className='py-2'
          />
        </Form.Item>
        <Form.Item
          name='desc'
          label='描述信息'
          rules={[{ required: true, message: '请输入类型描述!' }]}>
          <Input
            prefix={
              <LockOutlined className='site-form-item-icon text-gray-400' />
            }
            placeholder='简短描述该类型的用途'
            className='py-2'
          />
        </Form.Item>
        <div className='flex gap-4'>
          <Form.Item name='icon' label='图标' className='flex-1'>
            <Select
              placeholder={'选择图标'}
              showSearch
              allowClear
              className='w-full'
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
          <Form.Item name='themeColor' label='主题色' className='flex-shrink-0'>
            <div className='relative overflow-hidden rounded-lg w-[100px] h-[40px] border border-gray-200'>
              <Input
                type='color'
                className='absolute inset-[-4px] w-[120%] h-[120%] cursor-pointer p-0 border-none'
                style={{ padding: 0 }}
              />
            </div>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

import { Form, Input, Modal, Select, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useTodoList } from '@/hooks/useTodolist';
import { useAddTask, useUpdateTask } from '@/api/todolist/task';
import { config } from '@/config/react-query';
import { TaskItem } from '@/api/todolist/task/type';
import { useEffect } from 'react';

type TProps = {
  type: 'ADD' | 'EDIT';
  selectTask?: TaskItem;
  selectTaskType?: number;
  show: boolean;
  onOk: () => void;
  onCancel: () => void;
};

export function TasksModal({
  show,
  onOk,
  onCancel,
  type,
  selectTask,
  selectTaskType,
}: TProps) {
  const [form] = Form.useForm();

  const { taskType } = useTodoList();
  const { queryClient } = config();

  const { mutateAsync } = useAddTask();
  const { mutateAsync: updateTask } = useUpdateTask();

  useEffect(() => {
    if (selectTask) {
      const { taskName, taskContent, typeId } = selectTask;
      form.setFieldsValue({
        taskName,
        taskContent,
        typeId,
      });
    }
  }, [selectTask]);

  useEffect(() => {
    if (!show) {
      form.resetFields();
    }
  }, [show]);

  form.setFieldsValue({
    typeId: selectTaskType,
  });

  return (
    <Modal
      title={type === 'ADD' ? '添加任务' : '编辑任务'}
      open={show}
      okText={type === 'ADD' ? '添加任务' : '编辑任务'}
      cancelText={'取消'}
      onOk={form.submit}
      forceRender
      onCancel={onCancel}>
      <Form
        form={form}
        name='horizontal_login'
        onFinish={async () => {
          const params = form.getFieldsValue();
          if (type === 'ADD') {
            const res = await mutateAsync({ ...params });
            if (res.code === 200) {
              message.success('任务添加成功');
              queryClient.invalidateQueries('userTask');
            } else {
              message.error('任务添加失败');
            }
          } else {
            // 编辑逻辑
            const res = await updateTask({
              ...params,
              taskId: selectTask?.taskId,
            });
            if (res.code === 200) {
              message.success('任务编辑成功');
              queryClient.invalidateQueries('userTask');
            } else {
              message.error('任务编辑失败');
            }
          }

          onOk();
        }}>
        <Form.Item
          name='taskName'
          rules={[{ required: true, message: '请输入任务名称!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='任务名称'
          />
        </Form.Item>
        <Form.Item
          name='taskContent'
          rules={[{ required: true, message: '请输入任务描述!' }]}>
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='描述'
          />
        </Form.Item>
        <Form.Item
          name='typeId'
          rules={[{ required: true, message: '请选择任务类型' }]}>
          <Select
            placeholder='任务类型'
            style={{
              width: 150,
            }}>
            {taskType?.map((taskType) => (
              <Select.Option key={taskType.typeId} value={taskType.typeId}>
                {taskType.typeName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

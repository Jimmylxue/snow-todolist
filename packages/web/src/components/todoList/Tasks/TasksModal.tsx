import { DatePicker, Form, Input, Modal, Select, Space, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useTodoList } from '@/hooks/useTodolist';
import { useAddTask, useUpdateTask } from '@/api/todolist/task';
import { config } from '@/config/react-query';
import { TaskItem } from '@/api/todolist/task/type';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getTimeByMoment } from '../utils';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  const { originTaskType } = useTodoList();
  const { queryClient } = config();

  const { mutateAsync } = useAddTask();
  const { mutateAsync: updateTask } = useUpdateTask();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (selectTask) {
      const { taskName, taskContent, typeId, expectTime } = selectTask;
      form.setFieldsValue({
        taskName,
        taskContent,
        typeId: typeId || selectTaskType,
        expectTime: expectTime ? moment(+expectTime) : null,
      });
    }
  }, [selectTask, selectTaskType]);

  useEffect(() => {
    if (!show) {
      setTimeout(() => {
        form.resetFields();
      }, 500);
    }
  }, [show]);

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
          if (params.expectTime) {
            params.expectTime = String(
              getTimeByMoment(params.expectTime, 'end'),
            );
          }
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
          <ReactQuill theme='snow' value={value} onChange={setValue} />
        </Form.Item>

        <Space align='start'>
          <Form.Item noStyle dependencies={['expectTime']}>
            {({ getFieldValue }) => {
              const chooseTime = getFieldValue('expectTime');
              return (
                <>
                  <Form.Item
                    name='expectTime'
                    extra={<DateExtra chooseTime={chooseTime} />}>
                    <DatePicker
                      placeholder='请选择任务预期截止时间'
                      style={{
                        width: 200,
                      }}
                    />
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>

          <Form.Item
            name='typeId'
            rules={[{ required: true, message: '请选择任务类型' }]}>
            <Select
              placeholder='任务类型'
              style={{
                width: 150,
              }}>
              {originTaskType?.map((taskType) => (
                <Select.Option key={taskType.typeId} value={taskType.typeId}>
                  {taskType.typeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
}

function DateExtra({ chooseTime }: any) {
  if (!chooseTime) {
    return <div className=' text-xs mt-1 '>还没想好可先不填~</div>;
  }
  const timeStamp = getTimeByMoment(chooseTime, 'end');
  const isLessThanToday = timeStamp && timeStamp < Date.now();
  if (isLessThanToday) {
    return (
      <div className=' text-xs mt-1 text-orange-300'>
        截止时间已经小于当前时间咯~
      </div>
    );
  }

  return <></>;
}

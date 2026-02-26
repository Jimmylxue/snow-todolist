import { Button, DatePicker, Form, Input, Modal, Select, message } from 'antd';
import { useAddTask, useUpdateTask } from '@/api/todolist/task';
import { useEffect, useState } from 'react';
import { config } from '@/config/react-query';
import { TaskItem } from '@/api/todolist/task/type';
import { useTodoList } from '@/hooks/useTodolist';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';
import {
  ClockCircleOutlined,
  AlignLeftOutlined,
  AppstoreOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import './index.less';

type TProps = {
  type: 'ADD' | 'EDIT';
  selectTask?: TaskItem;
  selectTaskType?: number;
  show: boolean;
  onCancel: () => void;
  onOk: () => void;
};

const { Option } = Select;

export const TasksModal = ({
  type,
  show,
  onCancel,
  onOk,
  selectTask,
  selectTaskType,
}: TProps) => {
  const { mutateAsync } = useAddTask();
  const { mutateAsync: updateTask } = useUpdateTask();
  const { queryClient } = config();
  const [form] = Form.useForm();
  const { taskType } = useTodoList();
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (!show) {
      form.resetFields();
      setDesc('');
    }
  }, [show]);

  useEffect(() => {
    if (selectTask?.taskId && type === 'EDIT') {
      form.setFieldsValue({
        taskName: selectTask.taskName,
        typeId: selectTask.typeId,
        expectTime: selectTask?.expectTime
          ? dayjs(+selectTask.expectTime)
          : undefined,
      });
      setDesc(selectTask.taskContent);
    }
    if (type === 'ADD' && selectTaskType) {
      form.setFieldsValue({
        typeId: selectTaskType,
      });
    }
  }, [selectTask, type, selectTaskType]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const params = {
        ...values,
        taskContent: desc,
        expectTime: values.expectTime?.valueOf()
          ? String(values.expectTime?.valueOf())
          : undefined,
      };

      if (type === 'ADD') {
        const res = await mutateAsync(params);
        if (res.code === 200) {
          message.success('创建成功');
          onOk();
          setTimeout(() => {
            queryClient.invalidateQueries('userTask');
          }, 500);
        }
      } else {
        const res = await updateTask({
          ...params,
          taskId: selectTask?.taskId,
        });
        if (res.code === 200) {
          message.success('更新成功');
          onOk();
          setTimeout(() => {
            queryClient.invalidateQueries('userTask');
          }, 500);
        }
      }
    } catch (error) {
      console.error('Validate Failed:', error);
    }
  };

  return (
    <Modal
      title={
        <div className='text-xl font-bold text-gray-800 flex items-center gap-2'>
          {type === 'ADD' ? (
            <>
              <span className='w-1 h-6 bg-[var(--primary-color)] rounded-full block'></span>
              创建新任务
            </>
          ) : (
            <>
              <span className='w-1 h-6 bg-[var(--primary-color)] rounded-full block'></span>
              编辑任务
            </>
          )}
        </div>
      }
      open={show}
      onCancel={onCancel}
      footer={null}
      width={600}
      className='snow-task-modal'
      maskStyle={{
        backdropFilter: 'blur(8px)',
        backgroundColor: 'rgba(0,0,0,0.4)',
      }}
      wrapClassName='snow-modal-wrapper'
      centered
      maskClosable={false}
      destroyOnClose>
      <Form form={form} layout='vertical' className='mt-6' requiredMark={false}>
        <Form.Item
          name='taskName'
          label={
            <span className='text-gray-600 font-medium flex items-center gap-2'>
              <AlignLeftOutlined /> 任务名称
            </span>
          }
          rules={[{ required: true, message: '请输入任务名称' }]}>
          <Input
            placeholder='准备做什么？'
            className='h-12 text-lg rounded-xl border-gray-200 hover:border-[var(--primary-color)] focus:border-[var(--primary-color)] focus:shadow-sm transition-all bg-gray-50'
          />
        </Form.Item>

        <div className='grid grid-cols-2 gap-6' id='dz-task-type-select'>
          <Form.Item
            name='typeId'
            label={
              <span className='text-gray-600 font-medium flex items-center gap-2'>
                <AppstoreOutlined /> 任务类型
              </span>
            }
            rules={[{ required: true, message: '请选择任务类型' }]}>
            <Select
              placeholder='选择类型'
              className='h-12 rounded-xl border-none '
              popupClassName='rounded-xl shadow-xl border border-gray-100'>
              {taskType?.map((item) => (
                <Option key={item.typeId} value={item.typeId} className='h-12'>
                  <div className='flex items-center gap-2 py-1 h-12'>
                    <span
                      className='w-2 h-2 rounded-full'
                      style={{ backgroundColor: item.themeColor }}></span>
                    {item.typeName}
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='expectTime'
            label={
              <span className='text-gray-600 font-medium flex items-center gap-2'>
                <CalendarOutlined /> 截止日期
              </span>
            }>
            <DatePicker
              className='w-full h-12 rounded-xl border-none bg-gray-50 hover:bg-white transition-all'
              placeholder='选填，默认为无'
              suffixIcon={<ClockCircleOutlined className='text-gray-400' />}
              format='YYYY-MM-DD HH:mm'
              showTime={{ format: 'HH:mm' }}
            />
          </Form.Item>
        </div>

        <Form.Item
          label={
            <span className='text-gray-600 font-medium flex items-center gap-2'>
              <AlignLeftOutlined /> 任务详情
            </span>
          }
          className='mb-8'>
          <div className='border border-gray-100 rounded-xl overflow-hidden bg-gray-50 focus-within:bg-white focus-within:border-[var(--primary-color)] focus-within:shadow-sm transition-all'>
            <ReactQuill
              theme='snow'
              value={desc}
              onChange={setDesc}
              placeholder='添加详细描述、备注或子任务...'
              className='snow-quill-editor'
              modules={{
                toolbar: [
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['clean'],
                ],
              }}
            />
          </div>
        </Form.Item>

        <div className='flex justify-end gap-3 pt-4 border-t border-gray-100'>
          <Button
            onClick={onCancel}
            className='h-10 px-6 rounded-lg border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 font-medium'>
            取消
          </Button>
          <Button
            type='primary'
            onClick={handleSubmit}
            className='h-10 px-8 rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-color)] border-none font-medium'>
            {type === 'ADD' ? '立即创建' : '保存修改'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

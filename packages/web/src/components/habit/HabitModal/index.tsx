import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Switch,
  message,
} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { IUseModalResult } from '@/hooks/useModal';
import { TUserHabit } from '@/api/sign/habit/type';
import { useEffect } from 'react';
import { useAddHabit, useEditHabit } from '@/api/sign/habit';
import { config } from '@/config/react-query';

const CheckboxGroup = Checkbox.Group;

const plainOptions = [
  { label: '周一', value: 1 },
  { label: '周二', value: 2 },
  { label: '周三', value: 3 },
  { label: '周四', value: 4 },
  { label: '周五', value: 5 },
  { label: '周六', value: 6 },
  { label: '周日', value: 7 },
];

const notifyTimeList = [
  {
    value: 1,
    label: '6:00',
  },
  {
    value: 2,
    label: '7:00',
  },
  {
    value: 3,
    label: '8:00',
  },
  {
    value: 4,
    label: '9:00',
  },
  {
    value: 5,
    label: '10:00',
  },
  {
    value: 6,
    label: '11:00',
  },
  {
    value: 7,
    label: '12:00',
  },
  {
    value: 8,
    label: '13:00',
  },
  {
    value: 9,
    label: '14:00',
  },
  {
    value: 10,
    label: '15:00',
  },
  {
    value: 11,
    label: '16:00',
  },
  {
    value: 12,
    label: '17:00',
  },
  {
    value: 13,
    label: '18:00',
  },
  {
    value: 14,
    label: '19:00',
  },
  {
    value: 15,
    label: '20:00',
  },
  {
    value: 16,
    label: '21:00',
  },
];

export const HabitModal = ({
  open,
  initValue,
  closeModal,
}: IUseModalResult<{ type: 'ADD' | 'EDIT'; habitInfo?: TUserHabit }>) => {
  const type = initValue?.type;
  const [form] = Form.useForm();
  const { mutateAsync: addHabit } = useAddHabit();
  const { mutateAsync: editHabit } = useEditHabit();
  const { queryClient } = config();

  const frequency = Form.useWatch('frequency', form);

  console.log('frequency', frequency);

  useEffect(() => {
    if (!open) {
      form.resetFields();
    }
  }, [open]);

  useEffect(() => {
    const init = {
      ...(initValue?.habitInfo || {}),
      frequencyDay: initValue?.habitInfo?.frequencyDay?.split(',')?.map(Number),
    };
    console.log('init', init);
    form.setFieldsValue(init);
  }, [initValue]);

  return (
    <Modal
      title={type === 'ADD' ? '添加打卡习惯' : '编辑打卡习惯'}
      open={open}
      okText={type === 'ADD' ? '添加习惯' : '编辑习惯'}
      cancelText={'取消'}
      forceRender
      onCancel={closeModal}
      footer={
        <div className='flex justify-end w-full'>
          <Button type='primary' onClick={form.submit}>
            {type === 'ADD' ? '添加习惯' : '编辑习惯'}
          </Button>
        </div>
      }>
      <Form
        form={form}
        name='horizontal_login'
        onFinish={async () => {
          const params = form.getFieldsValue();
          console.log('params', params);
          if (type === 'ADD') {
            await addHabit({
              ...params,
              frequencyDay: params.frequencyDay?.join(','),
            });
          } else {
            await editHabit({
              ...params,
              frequencyDay: params.frequencyDay?.join(','),
              habitId: initValue?.habitInfo?.habitId,
            });
          }
          message.success('操作成功');
          closeModal();
          setTimeout(() => {
            queryClient.invalidateQueries('userHabit');
          }, 500);
        }}>
        <Form.Item
          name='name'
          rules={[{ required: true, message: '请输入习惯名称!' }]}>
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='习惯名称'
          />
        </Form.Item>
        <Form.Item
          name='frequency'
          rules={[{ required: true, message: '请输入习惯名称!' }]}>
          <Radio.Group>
            <Radio value={0}>按天</Radio>
            <Radio value={1}>按周</Radio>
          </Radio.Group>
        </Form.Item>
        {frequency === 0 ? (
          <Form.Item
            name='frequencyDay'
            rules={[{ required: true, message: '请输入习惯名称!' }]}>
            <CheckboxGroup options={plainOptions} />
          </Form.Item>
        ) : (
          <Form.Item
            name='frequencyWeek'
            rules={[{ required: true, message: '每周打卡天数!' }]}>
            <Radio.Group>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
              <Radio value={5}>5</Radio>
              <Radio value={6}>6</Radio>
              <Radio value={7}>7</Radio>
            </Radio.Group>
          </Form.Item>
        )}

        <Form.Item name='notifyFlag'>
          <Switch checkedChildren='开启' unCheckedChildren='关闭' />
        </Form.Item>
        <Form.Item name='notifyTime'>
          <Select
            placeholder={'请选择提醒时间'}
            showSearch
            allowClear
            style={{ width: 200 }}
            options={notifyTimeList}></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

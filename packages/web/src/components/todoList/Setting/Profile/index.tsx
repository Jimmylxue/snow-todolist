import { TLoginUser } from '@/api/login';
import { FormItem } from '@/components/common/FormItem';
import { Upload } from '@/components/common/Upload';
import { useUser } from '@/hooks/useAuth';
import { Button, Input, Modal } from 'antd';
import { cloneDeep } from 'lodash';
import { useState } from 'react';

export function Profile() {
  const { user } = useUser();

  const [userInfo, setUserInfo] = useState<TLoginUser>(() => cloneDeep(user!));

  return (
    <div>
      <div className=' flex flex-col justify-center items-center'>
        <Upload onUploadSuccess={(url) => {}} defaultUrl={user?.avatar} />
        <p>{user?.username}</p>
      </div>

      <div className=' mt-2'>
        <FormItem
          name='昵称'
          value={userInfo.username}
          onChange={(value) => {
            setUserInfo({ ...userInfo, username: value });
          }}
        />
        <FormItem
          type='select'
          name='性别'
          value={userInfo.sex === 0 ? '男' : '女'}
          onChange={(value) => {
            setUserInfo({ ...userInfo, sex: +value as any });
          }}
        />

        <div className=' flex justify-center my-2'>
          <Button type='primary'>保存基础信息</Button>
        </div>
      </div>

      <div className=' mt-2'>
        <FormItem
          clickable
          name='邮箱'
          value={userInfo.mail}
          onEdit={() => {
            Modal.confirm({
              title: '修改邮箱',
              content: <Input placeholder='请输入邮箱' />,
              cancelText: '取消',
              okText: '确定',
            });
          }}
        />
        <FormItem
          clickable
          name='手机号'
          value={userInfo.phone}
          onEdit={() => {
            Modal.confirm({
              title: '修改邮箱',
              content: <Input placeholder='请输入邮箱' />,
              cancelText: '取消',
              okText: '确定',
            });
          }}
          onChange={(value) => {
            setUserInfo({ ...userInfo, phone: value });
          }}
        />
        <FormItem
          clickable
          name='密码'
          value='******'
          onEdit={() => {
            Modal.confirm({
              title: '修改邮箱',
              content: <Input placeholder='请输入邮箱' />,
              cancelText: '取消',
              okText: '确定',
            });
          }}
        />
      </div>
    </div>
  );
}

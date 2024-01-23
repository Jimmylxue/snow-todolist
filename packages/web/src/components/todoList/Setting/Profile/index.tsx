import { TLoginUser } from '@/api/login';
import {
  useUpdateUser,
  useUpdateUserMail,
  useUpdateUserPhone,
} from '@/api/profile';
import { FormItem } from '@/components/common/FormItem';
import { Upload } from '@/components/common/Upload';
import { useUser } from '@/hooks/useAuth';
import { Button, Input, Modal, message } from 'antd';
import { useState } from 'react';
import { UpdatePhone } from './modal/updatePhone';
import { UpdateMail } from './modal/updateMail';

export function Profile() {
  const { user, updateUser } = useUser();

  const [userInfo, setUserInfo] = useState<TLoginUser>({
    avatar: user?.avatar!,
    mail: user?.mail!,
    phone: user?.phone!,
    username: user?.username!,
    sex: user?.sex!,
  });

  console.log('userInfo', user, userInfo);

  const { mutateAsync } = useUpdateUser({
    onSuccess: (res) => {
      if (res.code === 200) {
        message.success('更改成功');
        updateUser(userInfo);
      }
    },
  });

  const { mutateAsync: updateUserPhone } = useUpdateUserPhone({});
  const { mutateAsync: updateUserMail } = useUpdateUserMail({});

  const [updatePhoneShow, setUpdatePhoneShow] = useState<boolean>(false);
  const [updateMailShow, setUpdateMailShow] = useState<boolean>(false);

  return (
    <div>
      <div className=' flex flex-col justify-center items-center'>
        <Upload
          onUploadSuccess={(url) => {
            setUserInfo({ ...userInfo, avatar: url });
          }}
          defaultUrl={userInfo?.avatar}
        />
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
          <Button
            type='primary'
            onClick={async () => {
              await mutateAsync(userInfo);
            }}>
            保存基础信息
          </Button>
        </div>
      </div>

      <div className=' mt-2'>
        <FormItem
          clickable
          name='邮箱'
          value={userInfo.mail || '绑定邮箱'}
          onEdit={() => {
            setUpdateMailShow(true);
          }}
        />
        <FormItem
          clickable
          name='手机号'
          value={userInfo.phone || '绑定手机号'}
          onEdit={() => {
            setUpdatePhoneShow(true);
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

      <UpdatePhone
        initData={{ ...userInfo }}
        open={updatePhoneShow}
        isChangePhone={!!userInfo.phone}
        onOk={async (values) => {
          const res = await updateUserPhone(values);
          if (res.code === 200) {
            const newData = { ...userInfo, phone: values.newPhone };
            setUserInfo(newData);
            updateUser(newData);
            message.success('更改成功');
          }
          setUpdatePhoneShow(false);
        }}
        onCancel={() => {
          setUpdatePhoneShow(false);
        }}
      />

      <UpdateMail
        open={updateMailShow}
        isChangeMail={!!userInfo.mail}
        initData={{ ...userInfo }}
        onOk={async (values) => {
          const res = await updateUserMail(values);
          if (res.code === 200) {
            const newData = { ...userInfo, mail: values.newMail };
            setUserInfo(newData);
            updateUser(newData);
            message.success('更改成功');
          }
          setUpdateMailShow(false);
        }}
        onCancel={() => {
          setUpdateMailShow(false);
        }}
      />
    </div>
  );
}

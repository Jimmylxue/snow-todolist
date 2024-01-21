import { Upload as AUpload, UploadProps, message } from 'antd';
import { useState } from 'react';
// @ts-ignore
import type { GetProp } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img as any);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

type TProps = {
  defaultUrl?: string;
  onUploadSuccess: (url: string) => void;
};

export function Upload({ onUploadSuccess, defaultUrl = '' }: TProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultUrl);
  const [loading, setLoading] = useState(false);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }

    if (info.file.response?.code === 200) {
      setLoading(false);
      setImageUrl(info.file.response?.result);
      onUploadSuccess(info.file.response?.result);
      console.log('图片上传成功：', info.file.response?.result);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <AUpload
      name='file'
      style={{
        width: 'fit-content',
      }}
      listType='picture-card'
      className='avatar-uploader w-fit'
      showUploadList={false}
      headers={{
        authorization: 'Bearer ' + localStorage.getItem('token'),
      }}
      action='https://api.jimmyxuexue.top/upload'
      // action='http://127.0.0.1:9999/upload'
      beforeUpload={beforeUpload}
      onChange={handleChange}>
      {imageUrl ? (
        <img src={imageUrl} alt='avatar' style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </AUpload>
  );
}

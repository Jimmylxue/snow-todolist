import React from 'react';
import { Select } from 'antd';
import Icon from '@ant-design/icons';
import * as icons from '@ant-design/icons';

const { Option } = Select;

export interface iconSelectProps {
  placeholder?: string;
}
export const IconSelect: React.FC<iconSelectProps> = ({
  placeholder = '请选择图标',
}) => {
  // const iconList = Object.keys(icons)
  // 里面有一些是方法,要筛选一遍,否则页面会报错
  const iconList = Object.keys(icons).filter((item) => {
    // @ts-ignore
    return typeof icons[item] === 'object';
  });
  return (
    <Select
      placeholder={placeholder}
      showSearch
      allowClear
      style={{ width: '100%' }}
      onChange={(val) => {
        console.log(val);
      }}>
      {iconList.map((item) => {
        return (
          <Option value={item} key={item}>
            {/* @ts-ignore */}
            <Icon component={icons[item]} style={{ marginRight: '8px' }} />
            {item}
          </Option>
        );
      })}
    </Select>
  );
};

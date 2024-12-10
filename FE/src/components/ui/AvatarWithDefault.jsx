import React, { memo } from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const AvatarWithDefault = ({ avatar, size }) => {
  return <Avatar size={size} icon={<UserOutlined />} src={avatar} />;
};

export default memo(AvatarWithDefault);

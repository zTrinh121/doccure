import { Image } from 'antd';
import doccure from '../../assets/doccure.png';
import { Link } from 'react-router-dom';
import { memo } from 'react';

const LogoButton = () => {
  return (
    <Link to="/">
      <Image
        src={doccure}
        alt="Logo"
        style={{
          height: '35px',
        }}
        preview={false}
      />
    </Link>
  );
};

export default memo(LogoButton);

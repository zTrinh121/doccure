import { Image } from 'antd';
import doccure from '../../assets/doccure.png';
import { Link } from "react-router-dom";


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

export default LogoButton;

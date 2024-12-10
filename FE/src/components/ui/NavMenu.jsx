import { Menu } from 'antd';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

const NavMenu = () => {
  const locationArr = useLocation().pathname.split('/');
  const location = locationArr[1];

  const navigate = useNavigate();
  const onClick = ({ key }) => {
    navigate(`${key}`);
  };

  return (
    <Menu
      onClick={onClick}
      style={{
        backgroundColor: '#E2E8F0',
        flex: 1,
        minWidth: 0,
      }}
      mode="horizontal"
      defaultSelectedKeys={['']}
      selectedKeys={[location]}
      items={[
        { key: '', label: 'Home' },
        { key: 'search', label: 'Search' },
        { key: 'user', label: 'User' },
      ]}
    />
  );
};

export default NavMenu;


import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <>
      <div>Profile</div>

      <Link to="/user/changePassword">Change Password</Link>
    </>
  );
};

export default Profile;

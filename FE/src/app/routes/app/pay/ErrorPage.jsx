import { CloseCircleTwoTone } from '@ant-design/icons';
import { Card, Flex, Button,Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import CenterLayout from '../../../../components/layouts/CenterLayout';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <CenterLayout>
      <Card>
        <Flex vertical align="center">
          <CloseCircleTwoTone
            twoToneColor={'#DD3B29'}
            style={{ fontSize: '400%' }}
          />
          <Typography.Title
            level={4}
            style={{
              margin: 0,
            }}
          >
            Something went wrong!
          </Typography.Title>
          <Button
            onClick={() => {
              navigate('/');
            }}
            className="mt-2"
          >
            Return home
          </Button>
        </Flex>
      </Card>
    </CenterLayout>
  );
};

export default ErrorPage;

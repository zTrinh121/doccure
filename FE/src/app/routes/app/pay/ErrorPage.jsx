import { CloseCircleTwoTone } from '@ant-design/icons';
import ContentLayout from '../../../../components/layouts/ContentLayout';
import { Card, Flex, Button,Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout>
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
    </ContentLayout>
  );
};

export default ErrorPage;

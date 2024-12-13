import background from 'src/assets/background.png';
import { Flex, Input, Space, Carousel, Button, Form } from 'antd';
import DoctorCard from 'src/features/doctors/components/DoctorCard';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';

import { searchDoctors } from 'src/lib/doctor';
import { useNavigate } from 'react-router-dom';
import { useDoctorsRating } from 'src/hooks/useDoctorsRating';

// import { useAuthStore } from '../../../stores/authStore';

const HomePage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    searchDoctors(values.search);
    if (values.search.trim()) {
      navigate(`/search?query=${encodeURIComponent(values.search)}`);
    }
  };

  const { isPending, data } = useDoctorsRating();
  if (isPending) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  return (
    <>
      {/* https://ant.design/components/app */}
      <Flex
        justify="center"
        style={{
          width: '100vw',
          height: '200px',
          background: ` url(${background}) #f9f9f9`,
          backgroundSize: '100% ',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center bottom',
        }}
      >
        <Space>
          <Form onFinish={onFinish} autoComplete="off">
            <Form.Item name="search">
              <Input prefix={<SearchOutlined />}></Input>
            </Form.Item>
          </Form>
        </Space>
      </Flex>

      <Flex
        justify="center"
        align="center"
        className="w-full py-8 bg-[#E6F7FF] text-center mt-8"
      >
        <Space direction="vertical" align="center">
          <h2 className="text-2xl font-semibold text-blue-700">
            Book an Appointment Today
          </h2>
          <p className="text-gray-600">
            We are here to provide you with exceptional care and support.
          </p>
          <Link to="/search">
            <Button type="primary" size="large">
              Schedule Now
            </Button>
          </Link>
        </Space>
      </Flex>

      <div className="px-8 my-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Our Doctors
        </h2>
        <Carousel draggable slidesToShow={3} arrows infinite={false}>
          {data?.map((doctor) => (
            <DoctorCard key={doctor.doctor_id} doctor={doctor} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomePage;

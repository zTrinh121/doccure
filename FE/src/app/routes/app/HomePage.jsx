import background from '../../../assets/background.png';
import { Flex, Input, Space, Carousel, Button, Form } from 'antd';
import DoctorCard from '../../../features/doctors/components/DoctorCard';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { searchDoctors } from '../../../lib/doctor';
import { useNavigate } from 'react-router-dom';
import { useDoctorsRating } from '../../../hooks/useDoctorsRating';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

// import { useAuthStore } from '../../../stores/authStore';

const HomePage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    searchDoctors(values.search);
    if (values.search.trim()) {
      navigate(`/search?query=${encodeURIComponent(values.search)}`);
    }
  };

  const { isPending, isError, data, error } = useDoctorsRating();
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

      {/* Testimonials Section
      <div className="bg-gray-100 py-12">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          What Our Patients Say
        </h2>
        <Carousel autoplay draggable slidesToShow={2} arrows>
          <div className="p-4">
            <blockquote className="italic text-gray-600">
              "The doctors here are compassionate and attentive. Highly
              recommended!"
            </blockquote>
            <p className="mt-2 text-right">- Patient A</p>
          </div>
          <div className="p-4">
            <blockquote className="italic text-gray-600">
              "Efficient and friendly service. I felt at ease the entire time."
            </blockquote>
            <p className="mt-2 text-right">- Patient B</p>
          </div>
          <div className="p-4">
            <blockquote className="italic text-gray-600">
              "Doccure offers excellent care and a welcoming atmosphere."
            </blockquote>
            <p className="mt-2 text-right">- Patient C</p>
          </div>
          <div className="p-4">
            <blockquote className="italic text-gray-600">
              "Highly skilled professionals and prompt service!"
            </blockquote>
            <p className="mt-2 text-right">- Patient D</p>
          </div>
        </Carousel>
      </div> */}

      <Flex
        justify="center"
        align="center"
        style={{
          width: '100%',
          padding: '2rem 0',
          backgroundColor: '#E6F7FF',
          textAlign: 'center',
          marginTop: '2rem',
        }}
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
          {data.map((doctor) => (
            <DoctorCard key={doctor.doctor_id} doctor={doctor} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default HomePage;

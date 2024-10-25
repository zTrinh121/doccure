import background from '../../../assets/background.png';
import { Flex,  Input, Space, Carousel } from 'antd';
import CircleCard from '../../../components/ui/circleCard';
import DoctorCard from '../../../features/doctors/components/DoctorCard';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useAccessToken } from '../../../stores/authStore';

// import { useAuthStore } from '../../../stores/authStore';

const HomePage = () => {
  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  // const username = useAuthStore((state) => state.username);

  const accessToken =useAccessToken()
  
  // console.log('username', username, accessToken);

  return (

    <>
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

          <Input prefix={<SearchOutlined />}></Input>
        </Space>
      </Flex>

      <Link to="/profile">Profile</Link>
      <CircleCard></CircleCard>

      <Carousel
        autoplay
        draggable={true}
        slidesToShow={3}
        arrows
        afterChange={onChange}
        >
        <CircleCard></CircleCard> <CircleCard></CircleCard>
        <CircleCard></CircleCard> <CircleCard></CircleCard>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

      <Carousel
        autoplay
        draggable={true}
        slidesToShow={3}
        arrows
        afterChange={onChange}
        >
        <DoctorCard></DoctorCard>
        <DoctorCard></DoctorCard>
        <DoctorCard></DoctorCard>
        <DoctorCard></DoctorCard>
        <DoctorCard></DoctorCard>
        <DoctorCard></DoctorCard>
      </Carousel>

  </>
  );
};

export default HomePage;

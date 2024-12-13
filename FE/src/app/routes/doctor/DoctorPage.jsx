import { useParams } from 'react-router-dom';
import DoctorPanel from 'src/features/doctors/components/DoctorPanel';
import { Row, Col } from 'antd';
import ReviewsCard from 'src/features/doctors/components/ReviewsCard';

import { useScrollToReview } from 'src/hooks/useScrollToReview';

const DoctorPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param

  const reviewRef = useScrollToReview();

  return (
    <div>
      <Row>
        <Col span={4}></Col>

        <Col span={16}>
          <DoctorPanel doctorId={doctorId} />
          <ReviewsCard ref={reviewRef} doctorId={doctorId} />
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default DoctorPage;

import { useParams } from 'react-router-dom';
import DoctorPanel from '../../../features/doctors/components/DoctorPanel';
import { Row, Col } from 'antd';
import ReviewsCard from '../../../features/doctors/components/ReviewsCard';

import { getActions, useScrollTarget } from '../../../stores/scrollStore';
import { useEffect } from 'react';
import { useRef } from 'react';

const DoctorPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param
  // const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  // if (isPending) {
  //   return <IsPendingSpin />;
  // }
  // const responseData = data.data.data;
  const scrollTarget = useScrollTarget();

  const reviewRef = useRef(null);

  const { setScrollTarget } = getActions();

  useEffect(() => {
    if (scrollTarget === 'review') {
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setScrollTarget(''); //does not cause an infiniteloop because empty dependencies array but this is the definition of playing stupid games:)
  }, []);

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

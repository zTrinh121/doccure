import { useParams } from 'react-router-dom';
import { useDoctorQuery } from '../../../../hooks/useDoctorQuery';
import DoctorPanel from '../../../../features/doctors/components/DoctorPanel';
import { Row, Col } from 'antd';

import IsPendingSpin from '../../../../components/ui/IsPendingSpin';

const DoctorPage = () => {
  const { doctorId } = useParams(); //for getting doctor id from url param
  // const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  // if (isPending) {
  //   return <IsPendingSpin />;
  // }
  // const responseData = data.data.data;
  return (
    <div>
      <Row>
        <Col span={4}></Col>

        <Col span={16}>
          <DoctorPanel doctorId={doctorId} />
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default DoctorPage;

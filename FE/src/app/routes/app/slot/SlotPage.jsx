import { Row, Col } from 'antd';
import DoctorPanel from './../../../../features/doctors/components/DoctorPanel';
import { useParams } from 'react-router-dom';
import { useSlotQuery } from '../../../../hooks/useSlotQuery';
import IsPendingSpin from '../../../../components/ui/IsPendingSpin';

const SlotPage = () => {
  const { slotId } = useParams(); //for getting doctor id from url param

  const { isPending, isError, data, error } = useSlotQuery(slotId);

  if (isPending) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  const responseData = data.data.data;
  const doctorId = responseData.doctor_id;

  return (
    <div>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <DoctorPanel doctorId={doctorId} showBottomSection={false} />
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default SlotPage;

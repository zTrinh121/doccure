import { Row, Col, Button, Card } from 'antd';
import DoctorPanel from '../../../features/doctors/components/DoctorPanel';
import IsPendingSpin from '../../../components/ui/IsPendingSpin';

import { useParams } from 'react-router-dom';
import { useSlotQuery } from '../../../hooks/useSlotQuery';
import { useState } from 'react';
import { useDoctorQuery } from '../../../hooks/useDoctorQuery';

const SlotPage = () => {
  const { slotId } = useParams(); //for getting doctor id from url param
  //todo: somehow figure out how to make these names not stupid
  const [specId, setSpecId] = useState('');

  const slotQuery = useSlotQuery(slotId);
  console.log(slotQuery);
  const responseData = slotQuery.data.data.data||{};

  const doctorQuery = useDoctorQuery(
    responseData.doctor_id,
    slotQuery.isPending,
  );

  if (slotQuery.isPending) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  if (slotQuery.isPending || doctorQuery.isPending) {
    return <IsPendingSpin></IsPendingSpin>;
  }

  const responseDataDoctor = doctorQuery.data.data.data;

  const doctorId = responseData.doctor_id;

  return (
    <div>
      <Row>
        <Col span={4}></Col>
        <Col span={16}>
          <DoctorPanel doctorId={doctorId} showBottomSection={false} />
          <Card>
            {responseDataDoctor.specializations.map((item) => (
              <Button
                className="mx-2"
                key={item.specialization_id}
                type={item.specialization_id === specId ? 'primary' : ''}
                onClick={() => {
                  setSpecId(item.specialization_id);
                }}
              >
                {item.specialization_name}
              </Button>
            ))}
          </Card>
          <Button>Payment</Button>
        </Col>
        <Col span={4}></Col>
      </Row>
    </div>
  );
};

export default SlotPage;

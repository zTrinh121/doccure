import { useParams } from 'react-router-dom';
import IsPendingSpin from 'src/components/ui/IsPendingSpin';
import { useAppointmentQuery } from 'src/hooks/useAppointmentQuery';
import ContentLayout from 'src/components/layouts/ContentLayout';
import DoctorPanel from 'src/features/doctors/components/DoctorPanel';
import AppointmentInfoPanel from 'src/features/appointment/components/AppointmentInfoPanel';

const AppointmentPage = () => {
  const { appointmentId } = useParams();

  const { isPending, data } = useAppointmentQuery(appointmentId);

  if (isPending) {
    //todo:replace with skeleton
    return <IsPendingSpin />;
  }

  return (
    <ContentLayout>
      <div className="flex justify-between flex-col">
        <DoctorPanel
          doctorId={data.doctor.doctor_id}
          showBottomSection={false}
        />
        <AppointmentInfoPanel
          status={data.status}
          time={`${data.slot.date_slot} ${data.slot.start_time.slice(
            0,
            5,
          )} ${data.slot.end_time.slice(0, 5)}`}
          price={data.slot.price}
          invoiceId={data.invoice.invoice_id}
        ></AppointmentInfoPanel>
      </div>
    </ContentLayout>
  );
};

export default AppointmentPage;

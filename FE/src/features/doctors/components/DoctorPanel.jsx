import { useDoctorQuery } from "../../../hooks/useDoctorQuery";

const DoctorPanel = ({doctorId}) => {
  const { data, isSuccess, isPending, error } = useDoctorQuery(doctorId);
  return <div>DoctorPanel</div>;
};

export default DoctorPanel;

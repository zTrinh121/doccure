import { Button } from 'antd';
import ContentLayout from '../../../../components/layouts/ContentLayout';
import AppointmentList from '../../../../features/appointment/components/AppointmentList';
import {
  getGApiActions,
  useGApiAccessToken,
} from '../../../../stores/gApiStore';
const redirectUri = import.meta.env.VITE_GOOGLE_API_REDIRECT_URI;
const clientId = import.meta.env.VITE_GOOGLE_API_CLIENT_ID;

const AppointmentsPage = () => {
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.substring(1));
  const gApiAccessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');
  if (gApiAccessToken && expiresIn) {
    var expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + parseInt(expiresIn));
    const { setGApi } = getGApiActions();
    setGApi(gApiAccessToken, expiryTime);
  }
  console.log(redirectUri);

  return (
    <ContentLayout>
      <Button
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar.events&response_type=token&redirect_uri=${redirectUri}&client_id=${clientId}`}
      >
        Google verification
      </Button>

      <AppointmentList></AppointmentList>
    </ContentLayout>
  );
};

export default AppointmentsPage;

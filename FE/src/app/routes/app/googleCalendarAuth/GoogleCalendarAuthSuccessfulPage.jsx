import { getCallback } from '../../../../lib/googleCalendar';

const GoogleCalendarAuthSuccessfulPage = () => {
  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const scope = params.get('scope');

  if (code && scope) {
    try {
      getCallback(code, scope);
    } catch (error) {
      console.log(error);
      return (
        <p className="flex justify-center align-middle">
          Google calendar authorization failed, please retry later!s
        </p>
      );
    }
  }

  return (
    <p className="flex justify-center align-middle">
      Google calendar is authorized, you can now close this window
    </p>
  );
};

export default GoogleCalendarAuthSuccessfulPage;

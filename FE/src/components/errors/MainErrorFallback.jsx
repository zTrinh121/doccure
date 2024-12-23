import { Button } from 'antd';

export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center "
      role="alert"
    >
      <h2 className="text-lg font-semibold">
        Ooops, something went wrong sadge face emoji :|{' '}
      </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

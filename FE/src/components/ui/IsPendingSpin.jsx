import { Spin } from 'antd';

const IsPendingSpin = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
        <Spin size="large" />
      </div>
  )
}

export default IsPendingSpin
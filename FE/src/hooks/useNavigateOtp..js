import { useEffect } from 'react';
import { useResetStep } from 'src/stores/authStore';
import { useNavigate } from 'react-router-dom';

export const useNavigateOtp = () => {
  const resetStep = useResetStep();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetStep === 'otp') {
      navigate('/otp');
    }
  }, [resetStep, navigate]);
};

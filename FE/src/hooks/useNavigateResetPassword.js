import { useNavigate } from "react-router-dom";
import { useResetStep } from "../stores/authStore";
import { useEffect } from "react";

export const useNavigateResetPassword = () => {
  const navigate = useNavigate();
  const resetStep = useResetStep();

  useEffect(() => {
    if (resetStep === 'password') {
      navigate('/resetPassword');
    }
  }, [resetStep, navigate]);
};

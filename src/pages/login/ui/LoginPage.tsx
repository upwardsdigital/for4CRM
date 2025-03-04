import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/admin');
  }, []);

  return <div></div>;
};

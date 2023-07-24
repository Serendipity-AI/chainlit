import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Alert } from '@mui/material';

import { useAuth } from 'hooks/oktaauth';

export default function AuthCallback() {
  const { isAuthenticated, error } = useAuth();
  console.log(isAuthenticated, error);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return null;
}

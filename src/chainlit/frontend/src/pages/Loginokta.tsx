import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from 'hooks/oktaauth';

export default function Login() {
  /*const { signInWithRedirect, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  console.log(isAuthenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      signInWithRedirect();
    } else navigate('/');
  }, [isAuthenticated]);
  */
  return null;
}

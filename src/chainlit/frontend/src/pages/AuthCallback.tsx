import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Alert } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, roleState } from 'state/user';


import { useAuth } from 'hooks/oktaauth';

export default function AuthCallback() {
  console.log('AuthCallback');
  const [queryParameters] = useSearchParams()
  const { user, error, oktaAuth } = useAuth();
  const navigate = useNavigate();
  const accessToken = useRecoilValue(accessTokenState);
  const setAccessToken = useSetRecoilState(accessTokenState);
  console.log('accessToken', accessToken);
  /*
  if (accessToken === undefined) {
    oktaAuth.token.getWithRedirect({
      scopes: ['openid', 'email', 'profile'],
      responseType: ['id_token', 'token'],
      sessionToken: localStorage.getItem('okta-token-storage') || '',
      state: queryParameters.get('state') || '',
      nonce: queryParameters.get('code') || '',
    });
  }*/
  
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
  return null;
}

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAuth } from 'hooks/oktaauth';
import { accessTokenState, roleState } from 'state/user';


export default function Login() {
  const { oktaAuth, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const setAccessToken = useSetRecoilState(accessTokenState);


  useEffect(() => {
    if (!isAuthenticated) {
      // Use signInWithRedirect() and once done, update the auth state
      // it returns a promise, so when it's done, navigate to the home page
      oktaAuth.signInWithRedirect();
   } else navigate('/');
}, [isAuthenticated]);

  return null;

}

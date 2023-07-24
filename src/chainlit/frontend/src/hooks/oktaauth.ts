//import {User, useAuth0} from '@auth0/auth0-react';
import { useOktaAuth } from '@okta/okta-react';
import { useEffect, useState } from 'react';
//import { OktaAuth, UserClaims, CustomUserClaims } from '@okta/okta-auth-js';
import { useRecoilValue } from 'recoil';

import { projectSettingsState } from 'state/project';
import { accessTokenState, roleState } from 'state/user';

export const useAuth = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const pSettings = useRecoilValue(projectSettingsState);

  const config = {
    issuer: 'https://trial-5130133.okta.com',
    clientId: '0oa6hhqn45VWeqNdH697',
    redirectUri: window.location.origin + '/api/auth/callback'
  };

  //const oktaClient = new oktaAuth.OktaAuth(config)
  //   const { isAuthenticated, isLoading: _isLoading, ...other } = useAuth0();
  const accessToken = useRecoilValue(accessTokenState);
  const role = useRecoilValue(roleState);

  // If project id isn't set, the auth0 provider is not used and _isLoading is always true
  //const isLoading = _isLoading && pSettings?.project?.id;

  //const isProjectMember = isAuthenticated && role && role !== 'ANONYMOUS';
  const isProjectMember = true;
  const cloudAuthRequired =
    pSettings?.project.id && pSettings?.project.public === false;

  const [userInfo, setUserInfo] = useState<any>(null);

  console.log(authState);

  useEffect(() => {
    if (authState?.accessToken?.accessToken) {
      oktaAuth
        .getUser()
        .then((res) => setUserInfo(res))
        .catch((err) => console.log('[oktaauth] error getting user info', err));
    }
  }, [oktaAuth, authState]);
  // const testUserInfo = {
  //         sub: '00u1j5jz9jZ4Z7Z5Y0h7',
  //         id: '00u1j5jz9jZ4Z7Z5Y0h7',
  //         name: 'John Doe',
  //         given_name: 'John',
  //         family_name: 'Doe',
  //         middle_name: 'B',
  //         nickname: 'Johnny',
  //         preferred_username: 'johndoe',
  //         profile: 'https://example.com/johndoe',
  //         picture: 'https://example.com/johndoe/me.jpg',
  //         website: 'https://example.com',
  //         email: 'asdad@asd.asd',
  // }
  return {
    role,
    user: userInfo,
    accessToken: authState?.accessToken,
    authenticating: authState?.isPending,
    isProjectMember,
    isLoading: false,
    cloudAuthRequired,
    logout: oktaAuth.signOut,
    isAuthenticated: authState?.isAuthenticated,
    error: authState?.error,
    getAccessTokenSilently: oktaAuth.token.getWithoutPrompt,
    oktaAuth
  };
};

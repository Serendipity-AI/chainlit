//import { Auth0Provider } from '@auth0/auth0-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { createBrowserHistory } from 'history';
import { memo } from 'react';

//import { useRecoilValue } from 'recoil';

//import { projectSettingsState } from 'state/project';

// import { useHistory } from 'react-router-dom';
interface Props {
  children: JSX.Element;
}
const history = createBrowserHistory();

const oktaAuth = new OktaAuth({
  issuer: 'https://trial-5130133.okta.com',
  clientId: '0oa6hhqn45VWeqNdH697',
  redirectUri: window.location.origin + '/api/auth/callback',
  scopes: ['openid', 'profile', 'email']
});

export default memo(function AuthProvider({ children }: Props) {
  //const pSettings = useRecoilValue(projectSettingsState);

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    console.log('[AuthProvider] felix was here');
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    // <Auth0Provider
    //   domain="https://trial-5130133.okta.com"
    //   clientId="0oa6hhqn45VWeqNdH697"
    //   issuer='https://trial-5130133.okta.com'
    //   authorizationParams={{
    //     redirect_uri: `${window.location.origin}/api/auth/callback`
    //   }}
    //   useRefreshTokens={false}
    //   cacheLocation="localstorage"
    // >
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      {children}
    </Security>
    // </Auth0Provider>
  );
});

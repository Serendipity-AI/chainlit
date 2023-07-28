import { Auth0Provider } from '@auth0/auth0-react';
import { memo } from 'react';
import { useRecoilValue } from 'recoil';

import { projectSettingsState } from 'state/project';

interface Props {
  children: JSX.Element;
}
export default memo(function AuthProvider({ children }: Props) {
  const pSettings = useRecoilValue(projectSettingsState);

  if (pSettings?.project?.id) {
    return (
      <Auth0Provider
        domain={import.meta.env.VITE_AUTH0_DOMAIN}
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
        authorizationParams={{
          redirect_uri: `${window.location.origin}/api/auth/callback`
        }}
        useRefreshTokens={true}
        cacheLocation="localstorage"
      >
        {children}
      </Auth0Provider>
    );
  } else {
    return <>{children}</>;
  }
});

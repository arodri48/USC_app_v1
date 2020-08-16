import React from 'react';
import {InfoProvider} from 'USC_app_v1/Provider/InfoProvider';
import {AuthProvider} from 'USC_app_v1/Provider/AuthProvider';
import Navigator from 'USC_app_v1/Routes/appStack';

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

export default function App() {
  return (
    <AuthProvider>
      <InfoProvider>
        <Navigator />
      </InfoProvider>
    </AuthProvider>
  );
}

import React from 'react';
import {InfoProvider} from 'USC_app_v1/Provider/InfoProvider';
import {AuthProvider} from 'USC_app_v1/Provider/AuthProvider';
import Navigator from 'USC_app_v1/Routes/appStack';

import Amplify from 'aws-amplify';
import {API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
import {AmplifyProvider} from 'aws-amplify-react-hooks';
Amplify.configure(config);

const client = {
  API,
  graphqlOperation,
};

AmplifyProvider(client);

export default function App() {
  return (
    <AmplifyProvider client={client}>
      <AuthProvider>
        <InfoProvider>
          <Navigator />
        </InfoProvider>
      </AuthProvider>
    </AmplifyProvider>
  );
}

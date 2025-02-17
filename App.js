import React from 'react';
import Navigator from 'USC_app_v1/Routes/appStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigator />
    </SafeAreaProvider>
  );
}

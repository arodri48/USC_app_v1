import React from 'react';
import {useEffect, useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from 'USC_app_v1/Screens/WelcomeScreen';
import SearchScreen from 'USC_app_v1/Screens/SearchScreen';
import StoreScreen from 'USC_app_v1/Screens/StoreScreen';
import SplashScreen from '../Screens/SplashScreen';
import {AuthContext} from '../Provider/AuthProvider';
import * as AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="SearchScreen" component={SearchScreen} />
      <RootStack.Screen name="StoreScreen" component={StoreScreen} />
    </RootStack.Navigator>
  );
}
export default function AppStack() {
  const {state, dispatch} = useContext(AuthContext);
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // restoring token failed
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };
    bootstrapAsync();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        {state.isLoading ? (
          <MainStack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}}/>
        ) : state.userToken == null ? (
          <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{headerShown: false}}/>
        ) : (
          <MainStack.Screen name="Root" component={Root} options={{headerShown: false}}/>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

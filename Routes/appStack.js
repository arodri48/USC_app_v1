import React, {useState} from 'react';
import {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import WelcomeScreen from 'USC_app_v1/Screens/WelcomeScreen';
import SearchScreen from 'USC_app_v1/Screens/SearchScreen';
import StoreScreen from 'USC_app_v1/Screens/StoreScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import ImageList from '../media/ImageStore';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <RootStack.Screen
        name="StoreScreen"
        component={StoreScreen}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  );
}
export default function AppStack() {
  const [firstLaunch, setFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then((value) => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  if (firstLaunch === null) {
    return (
      <SafeAreaView style={styles.MainContainer}>
        <View style={styles.txtContainer}>
          <ActivityIndicator color="pink" size="large" />
          <Text> Please Wait...</Text>
        </View>
        <View style={styles.imageContainer}>
          <FastImage
            source={ImageList.Hands_cropped}
            style={styles.imageStyle}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </SafeAreaView>
    );
  } else if (firstLaunch === true) {
    return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="WelcomeScreen"
            component={WelcomeScreen}
            options={{headerShown: false}}
          />
          <MainStack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Root"
            component={Root}
            options={{headerShown: false}}
          />
        </MainStack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  txtContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageStyle: {
    width: '100%',
    height: 130,
  },
});

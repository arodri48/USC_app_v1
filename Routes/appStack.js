import React, {useState} from 'react';
import {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from 'USC_app_v1/Screens/SearchScreen';
import StoreScreen from 'USC_app_v1/Screens/StoreScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import ImageList from '../media/ImageStore';
import {Button} from 'react-native-elements';

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
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  const _onPressBegin = () => {
    AsyncStorage.setItem('alreadyLaunched', 'true');
    setFirstLaunch(false);
  };

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
  } else if (!firstLaunch) {
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
  } else {
    return (
      <SafeAreaView style={styles2.MainContainer}>
        <View style={styles2.logoParentContainer}>
          <FastImage
            source={ImageList.full_send_a_smile_logo}
            style={styles2.smileLogo}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>

        <View style={styles2.infoView}>
          <Text style={styles2.text}>
            Send A Smile aims to raise awareness for online shops with unique
            causes and themes, such as mental health, cancer awareness,
            black-owned shops, and women-led shops.
          </Text>
          <Text style={styles2.text}>
            Press 'Filter' or 'Sort' to organize the online shops, then select a
            shop to learn more.
          </Text>
          <Text style={styles2.text}>
            Send A Smile to yourself, loved ones, or friends by going to the
            online shop's website and sending gifts!
          </Text>
        </View>

        <Button
          title="Begin"
          onPress={_onPressBegin}
          buttonStyle={styles2.buttonStyle}
          titleStyle={styles2.buttonText}
        />

        <View style={styles2.bottomView}>
          <FastImage
            source={ImageList.Hands_cropped}
            style={styles2.handsImage}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </SafeAreaView>
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

const styles2 = StyleSheet.create({
  infoView: {
    width: '85%',
    height: '35%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#535358',
    fontSize: 17,
  },
  buttonStyle: {
    borderRadius: 40,
    backgroundColor: '#AF8DB3',
    padding: 10,
    paddingHorizontal: 60,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  bottomView: {
    width: '100%',
    height: 160,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  logoParentContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: 180,
  },

  smileLogo: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  handsImage: {
    width: '100%',
    height: 125,
    alignSelf: 'flex-end',
    alignContent: 'flex-end',
  },
});

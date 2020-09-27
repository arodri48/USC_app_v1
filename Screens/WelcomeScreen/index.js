import React, {useContext} from 'react';
import {AuthContext} from '../../Provider/AuthProvider';
import {View, Text, StyleSheet, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function WelcomeScreen({navigation}) {
  const {dispatch} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.logoParentContainer}>
        <FastImage
            source={ImageList.full_send_a_smile_logo}
            style={styles.smileLogo}
            resizeMode={FastImage.resizeMode.contain}
        />
      </View>
        <Text style={styles.text}>
          The COVID-19 pandemic has changed the way of life for all of us.
          During these times of uncertainty, it is important to connect with our
          loved ones and support important social causes. Select ‘Begin’ to discover
          online shops advocating for important causes and send a care package and gift
          to loved ones through their website. These online shops donate a percentage of
          sales to important social causes and charities. Let’s Send a Smile together!
        </Text>
        <Button
          title="Begin"
          onPress={() => dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonText}
        />

      <View style={styles.bottomView}>
        <FastImage
          source={ImageList.Hands_cropped}
          style={styles.handsImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text: {
    color: '#535358',
    fontSize: 18,
    paddingTop: 10,
    textAlign: 'center',
  },
  buttonStyle: {
    borderRadius: 40,
    backgroundColor: '#FCC6DF',
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
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logoParentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
  },

  smileLogo: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 150
  },

  handsImage: {
    width: '100%',
    height: 130,
  },
});

import React, {useContext} from 'react';
import {AuthContext} from '../../Provider/AuthProvider';
import {View, Text, StyleSheet} from 'react-native';
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
        Select ‘Begin’ to discover online shops with unique themes such as
        mental health, BLM, cancer awareness, and women-led online shops. After
        selecting a shop, you can go on their website and can find unique
        products and gifts for you, your loved ones, and friends. Let’s all Send
        a Smile together!
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
    width: '90%',
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
    justifyContent: 'flex-end',
    width: '100%',
    height: 200,
  },

  smileLogo: {
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  handsImage: {
    width: '100%',
    height: 130,
  },
});

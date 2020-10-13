import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function WelcomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.logoParentContainer}>
        <FastImage
          source={ImageList.full_send_a_smile_logo}
          style={styles.smileLogo}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.infoView}>
        <Text style={styles.text}>
          Select ‘Begin’ to discover online shops with unique themes such as
          mental health, cancer awareness, black-owned shops, and women-led
          shops.
        </Text>
        <Text style={styles.text}>
          Press 'Filter' or 'Sort' to organize the online shops, then select a
          shop to learn more.
        </Text>
        <Text style={styles.text}>
          Send A Smile to yourself, loved ones, or friends by going to the
          online shop's website and sending gifts!
        </Text>
      </View>

      <Button
        title="Begin"
        onPress={() => navigation.navigate('Root')}
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
  infoView: {
    width: '85%',
    height: '35%',
    justifyContent: 'space-between',
  },
  text: {
    color: '#535358',
    fontSize: 18,
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

import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';
import {SafeAreaView} from 'react-native-safe-area-context';

export default function SplashScreen() {
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

import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';


const {width, height} = Dimensions.get('window');

export default function SplashScreen({navigation}){
  return(
      <View style={styles.MainContainer}>
          <Text>Loading...</Text>
          <View style={styles.image}>
            <FastImage
              style={{width: 400, height: 400}}
              source={ImageList.HandsCenter}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
      </View>
  )
}

const styles = StyleSheet.create({

    MainContainer: {
        position:'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: width,
        height: height,
    },

    image:{
      alignItems:'center',
      justifyContent:'center',
      width:500,
      height:500,
      marginBottom:5,
    }


});

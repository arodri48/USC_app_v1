import React, {useContext} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';


const {width, height} = Dimensions.get('window');

export default function SplashScreen({navigation}){
  return(
      <View style={styles.MainContainer}>
          <View style={styles.txtContainer}>
            <Text style = {styles.txt}>  Please Wait...</Text>
          </View>
          <View style={styles.image}>
            <FastImage
              style={{width: '100%', height: 560}}
              source={ImageList.HandsCenter}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
      </View>
  )
}

const styles = StyleSheet.create({

    MainContainer: {
        flex:1,
//        position:'absolute',
        alignItems: 'center',
//        justifyContent: 'center',
        backgroundColor: 'white',
        width: width,
        height: height,
    },
    txtContainter:{
        flex:1,
        marginTop:40,
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        bottom:5,
    },
    txt:{
      justifyContent:'center',
      alignItems:'center',
      height:20,
      width:100,
    },
    image:{
      position:'absolute',
      bottom:0,
      alignItems:'center',
      width:width,
      height:560,
      marginBottom:5,
    }

});

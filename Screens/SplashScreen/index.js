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
              style={{width: '100%', height:'100%', paddingBottom:0, bottom:0}}
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
        alignItems: 'center',
  //      justifyContent: 'center',
        backgroundColor: 'white',
  //      width: width,
  //      height: height,
  //      paddingBottom:0,
  //      bottom:0,
    },
    txtContainter:{
        position:'absolute',
        height:30,
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:100,
        paddingBottom:0,
    },
    txt:{
      justifyContent:'center',
      alignItems:'center',
      marginTop:200,
      height:30,
      width:100,
    },
    image:{
      position:'absolute',
      bottom:0,
      justifyContent: 'center',
      alignItems:'center',
      width:'100%',
      height:'50%',
      paddingBottom:0,
      bottom:0,
    }

});

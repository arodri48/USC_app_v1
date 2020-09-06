import React, {useContext, useEffect, useState} from 'react';
import {View,Text,Dimensions,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet,Button, Linking, TouchableWithoutFeedback} from 'react-native';

import {InfoContext} from '../../Provider/InfoProvider';
import {API, graphqlOperation} from 'aws-amplify';
import {listStores} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';

const {width, height} = Dimensions.get('window');


export default function StoreScreen({navigation}){
{/*
    const [
        setStoreName,
        setStoreID,
        setStateLocation,
        setBio,
        setPrice,
        setWebsite,
          setGoodsType,
          setImage
      ] = useContext(InfoContext);
*/}

    const openUrl = () =>{
      let url = 'https://effiespaper.com';    //for test purpose
      Linking.openURL(url)
    };



    return(
        <View style={styles.MainContainer}>
            <View style={styles.info}>

              <View style = {styles.CancelButton}>
              {/*To do: change it to touchableOpacity instead of the current way? */}
                  <Button
                //      onPress={()=>navigation.navigate('SearchScreen')}    //Todo: edit onPress
                    color = '#FFC0CB'
                    borderColor = '#FFC0CB'
                    backgroundColor = '#FFC0CB'
                    title=" X "
                  />
              </View>

              <View style={{alignItems:'center', justifyContent:'center'}}>
                <FastImage
                    style={{width: 100, height: 100}}
                    source={ImageList.Test}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style = {styles.ShopName}> Effie's Paper </Text>

                {/*need to pass the real url to make it really work*/}
                <TouchableWithoutFeedback onPress={openUrl}>
                    <Text style = {styles.ShopUrl}>  https://effiespaper.com </Text>
                </TouchableWithoutFeedback>


                <Text style = {styles.ShopLoc}> Location City, State </Text>

                <Text style = {styles.origin}> ORIGINS:   test test test </Text>

                <Text style = {styles.service}> SERVICES:  test test  test</Text>

                <Text style = {styles.support}> SUPPORTS:  test  test  test</Text>


              </View>

            </View>
        </View>
    );
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

    info: {
        backgroundColor:'#FFC0CB',
        borderColor:'#FFC0CB',
        paddingVertical: 5,
        borderTopWidth: 1,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 15,
        width:'80%',
        height: '80%',
    },
    //To be implemeted later
    ShopName: {
      fontWeight:'bold',   //'700' Bold, '800' Heavy, '900' Black
      color:'black',
      fontSize:35,
      textAlign:'center',
    },
    ShopUrl:{
      marginTop:5,
      color:'#FFFFFF',
      alignItems:'center',
      justifyContent:'center',
      fontSize:14,
    },
    ShopLoc:{
      marginTop:15,
      fontWeight:'bold',   //'700' Bold, '800' Heavy, '900' Black
      fontSize:15,
      marginBottom:5,
      color:'black',
    },
    CancelButton: {
      position:'relative',
      backgroundColor:'#FFC0CB',
      borderColor:'#FFC0CB',
      color:'#FFC0CB',
      width:40,
      height:40,
      borderTopWidth:10,
      borderLeftWidth:10,
      borderRadius:15,
      alignItems:'center',
      justifyContent:'center',
    },
    origin:{
      marginTop:5,
      marginBottom:5,
    },
    service:{
      marginTop:5,
      marginBottom:5,
    },
    support:{
      marginTop:5,
      marginBottom:5,
    }

});

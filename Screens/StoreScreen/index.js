import React, {useContext, useEffect, useState} from 'react';
import {View,Text,Dimensions,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet,Button} from 'react-native';

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
                <Text style = {{alignItems:'center', justifyContent:'center'}}>   the storeScreen, to be implemented today   </Text>
              </View>
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
    },
    ShopUrl:{
    },
    ShopLoc:{
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
    }

});

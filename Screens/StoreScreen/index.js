import React, {useContext, useEffect, useState} from 'react';
import {View,Text,Dimensions,FlatList,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native';

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
                <FastImage
                     style={{width: 100, height: 100}}
                     source={ImageList.Test}
                     resizeMode={FastImage.resizeMode.contain}
                 />
                <Text style = {{alignItems:'center', justifyContent:'center'}}>   the storeScreen, to be implemented tomorrow   </Text>
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
        justifyContent:'center',
        alignItems:'center',
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

});

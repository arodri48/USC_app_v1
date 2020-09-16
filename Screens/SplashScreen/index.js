import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';


export default function SplashScreen({navigation}) {
    return (
        <View style={styles.MainContainer}>
            <View style={styles.txtContainer}>
                <ActivityIndicator color='pink' size="large"/>
                <Text> Please Wait...</Text>
            </View>
            <View style={styles.imageContainer}>
                <FastImage
                    source={ImageList.Hands_cropped}
                    style={{width: '100%', height: 130, }}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>

        </View>
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
        alignItems: 'center'
    },
    imageContainer:{
        height: '50%',
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

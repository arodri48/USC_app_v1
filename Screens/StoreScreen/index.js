import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Button,
  Linking,
  TouchableWithoutFeedback,
} from 'react-native';

import {InfoContext} from '../../Provider/InfoProvider';
import {API, graphqlOperation} from 'aws-amplify';
import {createUrlClicked} from 'USC_app_v1/src/graphql/mutations';

import FastImage from 'react-native-fast-image';
import ImageList from '../../media/ImageStore';

const {width, height} = Dimensions.get('window');

const initialState = {storeID: ''};

export default function StoreScreen({navigation}) {
  const [
    storeName,
    setStoreName,
    storeID,
    setStoreID,
    stateLocation,
    setStateLocation,
    bio,
    setBio,
    price,
    setPrice,
    website,
    setWebsite,
    goodsType,
    setGoodsType,
    image,
    setImage,
  ] = useContext(InfoContext);

  const [urlState, setURLState] = useState(initialState);
  function setURL(key, value) {
    setURLState({...urlState, [key]: value});
  }

  const URL_Component = ({website_URL, storeID_code}) => {
    async function _handleURL() {
      // create graphQL entry for website and then open URL
      try {
        setURL('storeID', storeID_code);
        const urlClick = {...urlState};
        await API.graphql(
          graphqlOperation(createUrlClicked, {input: urlClick}),
        );
        Linking.openURL(website_URL);
      } catch (err) {
        console.log('Error opening URL');
      }
    }
    return (
      <TouchableWithoutFeedback onPress={_handleURL}>
        <Text style={styles.ShopUrl}>{website_URL}</Text>
      </TouchableWithoutFeedback>
    );
  };
  const _handleExit = () => {
    setStoreName('');
    setStoreID('');
    setStateLocation('');
    setBio('');
    setPrice('');
    setWebsite('');
    setGoodsType('');
    setImage('');
    navigation.navigate('SearchScreen');
  };

  useEffect(() => {
    setStoreName("Effie's Paper");
    setWebsite('https://effiespaper.com');
    setStateLocation('MA');
    setPrice('$');
    setBio('Test');
    setGoodsType('Paper');
  }, [
    setBio,
    setGoodsType,
    setPrice,
    setStateLocation,
    setStoreName,
    setWebsite,
  ]);
  return (
    <View style={styles.MainContainer}>
      <View style={styles.info}>
        <Button
          onPress={_handleExit}
          color="#FFC0CB"
          borderColor="#FFC0CB"
          backgroundColor="#FFC0CB"
          title=" X "
          style={styles.CancelButton}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          {/* Will need to actually load in image file from url or S3 bucket */}
          <FastImage
            style={{width: 100, height: 100}}
            source={ImageList.Test}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.ShopName}> Store Name: {storeName} </Text>

          <URL_Component website_URL={website} storeID_code={storeID} />

          <Text style={styles.ShopLoc}> State: {stateLocation} </Text>

          <Text style={styles.origin}> Price: {price} </Text>

          <Text style={styles.service}> Bio: {bio}</Text>

          <Text style={styles.support}>
            Type of Product/Service: {goodsType}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width,
    height: height,
  },

  info: {
    backgroundColor: '#FFC0CB',
    borderColor: '#FFC0CB',
    paddingVertical: 5,
    borderTopWidth: 1,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 15,
    width: '80%',
    height: '80%',
  },
  //To be implemeted later
  ShopName: {
    fontWeight: 'bold', //'700' Bold, '800' Heavy, '900' Black
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
  },
  ShopUrl: {
    marginTop: 5,
    color: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
  ShopLoc: {
    marginTop: 15,
    fontWeight: 'bold', //'700' Bold, '800' Heavy, '900' Black
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
  },
  CancelButton: {
    position: 'relative',
    backgroundColor: '#FFC0CB',
    borderColor: '#FFC0CB',
    color: '#FFC0CB',
    width: 40,
    height: 40,
    borderTopWidth: 10,
    borderLeftWidth: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  origin: {
    marginTop: 5,
    marginBottom: 5,
  },
  service: {
    marginTop: 5,
    marginBottom: 5,
  },
  support: {
    marginTop: 5,
    marginBottom: 5,
  },
});

import React, {useContext} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import {Button} from 'react-native-elements';
import {InfoContext} from '../../Provider/InfoProvider';
import {API, graphqlOperation} from 'aws-amplify';
import {createUrlClicked} from 'USC_app_v1/src/graphql/mutations';

import FastImage from 'react-native-fast-image';

const {width, height} = Dimensions.get('window');


export default function StoreScreen({route, navigation}) {
  /*
  const {
    storeName,
    storeID,
    stateLocation,
    bio,
    price,
    website,
    goodsType,
    image,
    cause,
  } = useContext(InfoContext);
   */
  const {storeName, id, stateLocation, bio, PricePoint, website, goodsType, image, cause} = route.params;


  const URL_Component = ({website_URL, storeID_code}) => {
    async function _handleURL() {
      // create graphQL entry for website and then open URL
      try {
        const urlAPI = await API.graphql(
          graphqlOperation(createUrlClicked, {input: {storeID: storeID_code, listAll: "Y"}}),
        );
        //console.log(urlAPI);
        await Linking.openURL(website_URL);
      } catch (err) {
        //console.log('Error opening URL');
      }
    }
    return (
      <TouchableWithoutFeedback onPress={() => _handleURL()}>
        <Text style={styles.ShopUrl}>{website_URL}</Text>
      </TouchableWithoutFeedback>
    );
  };
  /*
  const _handleExit = () => {
    setStoreNameValue('');
    setStoreIDValue('');
    setStoreLocationValue('');
    setBioValue('');
    setPriceValue('');
    setWebsiteValue('');
    setGoodsTypeValue('');
    setImageValue('');
    setCauseValue('')
    navigation.navigate('SearchScreen');
  };
  */
  return(
      <View style={styles.MainContainer}>
        <View style={styles.info}>
          <Button
              onPress={() => navigation.navigate('SearchScreen')}
              title="X"
              buttonStyle={styles.CancelButton}
          />
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <View style={{ justifyContent: 'center', alignItems: 'center'}}>
              <FastImage
                  style={{width: 300, height: 100}}
                  source={{uri: image}}
                  resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <Text style={styles.ShopName}>{storeName} </Text>
            <Text style={styles.support}>{goodsType}</Text>
            <URL_Component website_URL={website} storeID_code={id} />

            <Text style={styles.origin}>{PricePoint} </Text>
            <ScrollView style={{ width: '80%', height: '60%'}}>
              <Text style={styles.service}>{bio}</Text>

            </ScrollView>


          </View>
        </View>
      </View>
  )

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
    width: '90%',
    height: '90%',
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
    backgroundColor: 'transparent',
    width: 30,
    height: 30,
    marginLeft: 10,
    marginTop: 5,
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

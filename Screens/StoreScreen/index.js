import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  TouchableWithoutFeedback,
  ScrollView, TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'react-native-elements';
import {API, graphqlOperation} from 'aws-amplify';
import {createUrlClicked} from 'USC_app_v1/src/graphql/mutations';

import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

export default function StoreScreen({route, navigation}) {
  const {
    storeName,
    id,
    bio,
    PricePoint,
    website,
    goodsType,
    image,
  } = route.params;

  const URL_Component = ({website_URL, storeID_code}) => {
    async function _handleURL() {
      // create graphQL entry for website and then open URL
      try {
        await API.graphql(
          graphqlOperation(createUrlClicked, {
            input: {storeID: storeID_code, listAll: 'Y'},
          }),
        );
        //console.log(urlAPI);
        await Linking.openURL(website_URL);
      } catch (err) {
        //console.log('Error opening URL');
      }
    }
    return (
      <TouchableOpacity onPress={() => _handleURL()}>
        <Text style={styles.ShopUrl}>{website_URL}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.info}>
        <Button
          onPress={() => navigation.navigate('SearchScreen')}
          icon={
            <Icon
                name="arrow-left"
                size={30}
                color="white"
            />
            }
          buttonStyle={styles.CancelButton}
          containerStyle={styles.buttonContainer}
        />
        <View style={styles.imageContainer}>
          <FastImage
            style={styles.imageStyle}
            source={{uri: image}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.ShopName}>{storeName} </Text>
        <Text style={styles.support}>{goodsType}</Text>
        <URL_Component website_URL={website} storeID_code={id} />
        <Text style={styles.origin}>{PricePoint} </Text>
        <ScrollView style={styles.bioContainer}>
          <Text style={styles.service}>{bio}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 300,
    height: 100,
  },
  MainContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: width,
    height: height,
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
  bioContainer: {
    width: '80%',
    height: '60%',
  },

  info: {
    backgroundColor: '#FFC0CB',
    borderColor: '#FFC0CB',
    paddingVertical: 5,
    marginBottom: 20,
    borderRadius: 15,
    width: '90%',
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 50,
    height: 40,
    marginLeft: 5,
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

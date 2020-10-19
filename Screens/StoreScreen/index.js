import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Linking,
  ScrollView,
  TouchableOpacity,
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
    cause,
    discountCode,
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
      <View style={styles.websiteComponentStyle}>
        <Text style={styles.boldText}>Website: </Text>
        <TouchableOpacity
          style={styles.urlContainer}
          onPress={() => _handleURL()}>
          <Text style={styles.ShopUrl}>{website_URL}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.info}>
        <Button
          onPress={() => navigation.navigate('SearchScreen')}
          icon={<Icon name="arrow-left" size={30} color="black" />}
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
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Category: </Text>
          <Text>{goodsType}</Text>
        </View>
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Cause: </Text>
          <Text>{cause}</Text>
        </View>
        {discountCode !== null && (
          <View style={styles.websiteComponentStyle}>
            <Text style={styles.boldText}>Discount Code: </Text>
            <Text selectable={true}>{discountCode}</Text>
          </View>
        )}
        <URL_Component website_URL={website} storeID_code={id} />
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Price: </Text>
          <Text>{PricePoint}</Text>
        </View>
        <ScrollView style={styles.bioContainer}>
          <Text>
            <Text style={styles.service}>Info: </Text>
            <Text>{bio}</Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  websiteComponentStyle: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5,
    width: '80%',
    justifyContent: 'center',
  },
  urlContainer: {
    flexShrink: 1,
  },
  ShopUrl: {
    color: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
  },
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
    backgroundColor: '#BFE3B4',
    borderColor: '#BFE3B4',
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
    width: '80%',
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
    fontWeight: 'bold',
  },
  support: {
    marginTop: 5,
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

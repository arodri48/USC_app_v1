import React, {useEffect, useState} from 'react';
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
import Ionicon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-elements';
import {API, graphqlOperation} from 'aws-amplify';
import {createUrlClicked} from 'USC_app_v1/src/graphql/mutations';
import Share from 'react-native-share';

import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getStore} from '../../src/graphql/queries';
import {createStoreShared} from '../../src/graphql/mutations';

const {width, height} = Dimensions.get('window');

export default function StoreScreen({route, navigation}) {
  const [storeInfo, setStoreInfo] = useState({});
  useEffect(() => {
    async function fetchStore() {
      return API.graphql({
        query: getStore,
        variables: {id: route.params.id},
      });
    }
    if (route.params?.cause) {
      setStoreInfo(route.params);
    } else {
      fetchStore().then((store) => {
        setStoreInfo(store.data.getStore);
      });
    }
  }, [route.params]);

  const shareStoreURL = () => {
    const shareOptions = {
      message: 'Check out this store I found on Send A Smile:',
      url: storeInfo.website,
      failOnCancel: false,
    };
    Share.open(shareOptions)
      .then((res) => {
        // if person does actually share, make graphql entry
        // otherwise, don't do anything
        if (!res.dismissedAction) {
          API.graphql(
            graphqlOperation(createStoreShared, {
              input: {storeID: storeInfo.id, listAll: 'Y'},
            }),
          );
        }
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

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
        <View style={styles.topButtonRow}>
          <Button
            onPress={() => navigation.navigate('SearchScreen')}
            icon={<Icon name="arrow-left" size={30} color="black" />}
            buttonStyle={styles.CancelButton}
          />
          <View style={styles.width_seventy} />
          <Button
            icon={
              <Ionicon name="share-social-outline" size={30} color="black" />
            }
            buttonStyle={styles.CancelButton}
            onPress={shareStoreURL}
          />
        </View>

        <View style={styles.imageContainer}>
          <FastImage
            style={styles.imageStyle}
            source={{uri: storeInfo.image}}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <Text style={styles.ShopName}>{storeInfo.storeName} </Text>
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Category: </Text>
          <Text>{storeInfo.goodsType}</Text>
        </View>
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Cause: </Text>
          <Text>{storeInfo.cause}</Text>
        </View>
        {storeInfo.discountCode !== null && (
          <View style={styles.websiteComponentStyle}>
            <Text style={styles.boldText}>Discount Code: </Text>
            <Text selectable={true}>{storeInfo.discountCode}</Text>
          </View>
        )}
        <URL_Component
          website_URL={storeInfo.website}
          storeID_code={storeInfo.id}
        />
        <View style={styles.websiteComponentStyle}>
          <Text style={styles.boldText}>Price: </Text>
          <Text>{storeInfo.PricePoint}</Text>
        </View>
        <ScrollView style={styles.bioContainer}>
          <Text>
            <Text style={styles.service}>Info: </Text>
            <Text>{storeInfo.bio}</Text>
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topButtonRow: {flexDirection: 'row', justifyContent: 'space-around',},
  width_seventy: {width: '70%'},
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
    height: 50,
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

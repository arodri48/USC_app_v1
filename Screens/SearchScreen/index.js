import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Button,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {InfoContext} from '../../Provider/InfoProvider';
import {API} from 'aws-amplify';
import {listStores} from '../../src/graphql/queries';

export default function SearchScreen({navigation}) {
  const {width, height} = Dimensions.get('window');

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
  ] = useContext(InfoContext);
  const flatListRef = useRef(null);

  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [stores, setStores] = useState([]);
  // This is initial loading of stores
  useEffect(() => {
    fetchStores();
  }, []);

  // This is useEffect for when reloading (either pull down or when filters change)
  // TODO: write this useEffect
  //This is useEffect for when loading more
  // TODO: write this useEffect
  useEffect(() => {
    if (!loadingMore) {
      return;
    } else {
    }
  }, [loadingMore]);

  async function fetchStores() {
    //TODO: write code to fetch the stores from AWS and store next page token
    try {
      const storeData = await API.graphql({
        query: listStores,
        variables: {
          limit: 10,
        },
      });
      const stores = storeData.data.listStores.items;
      const nextpagetoken = storeData.data.listStores.nextToken;
      setStores(stores);
      setNextPageToken(nextpagetoken);
    } catch (err) {
      console.log('error fetching stores');
    }
    setLoading(false);
  }

  async function fetchMoreStore() {
    try {
      // TODO: load next query of stores, append dataset to old, then set state
    } catch (err) {
      console.log('error fetching more stores');
    }
    setLoadingMore(false);
  }
  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View
        style={{
          position: 'relative',
          width: width,
          height: height,
          paddingVertical: 20,
          borderTopWidth: 1,
          marginTop: 10,
          marginBottom: 10,
          borderColor: 'pink',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };
  const onPressStore = ({item}) => {
    // TODO: load the item attributes to the info provider
    //TODO: once info provider is updated, move to second screen.
  };

  const Store = ({item, onPress}) => {
    <TouchableOpacity onPress={onPress}>{/*TODO: Contents*/}</TouchableOpacity>;
  };
  const renderStore = ({item}) => {
    // Write renderStore code here
    return <Store item={item} onPress={() => onPressStore(item)} />;
  };

  const loadMoreStores = () => {
    setLoadingMore(true);
    // TODO: Implement a useEffect that runs when setLoadingMore is true
  };

  const refreshStoreList = () => {
    setNextPageToken(null);
    setRefreshing(true);
    // TODO: Implement a useEffect that runs when Refreshing is true
  };

  // need to implement onEndReached, and onRefresh; add a useEffect to reload/reset when search settings are altered

  //https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native use this link for more reference on how to implement infinite scrolling
  // https://docs.amplify.aws/guides/api-graphql/graphql-pagination/q/platform/js#querying-from-a-javascript-application how to implement pagination for AWS Amplify
  return !loading ? (
    <View>
      {/* TODO: Need to add title and filter selections, need to add filter state variables above*/}
      <FlatList
        data={stores}
        renderItem={renderStore}
        onEndReached={loadMoreStores}
        refreshing={refreshing}
        onRefresh={refreshStoreList}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.5}
        initialNumToRender={10}
        ref={flatListRef}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  ) : (
    <View>
      <Text style={{alignSelf: 'center'}}>Loading Stores</Text>
      <ActivityIndicator />
    </View>
  );
}

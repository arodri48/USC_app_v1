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
import {listStores} from '../../src/graphql/queries';
import {getNames, useQuery} from 'aws-amplify-react-hooks';

export default function SearchScreen({navigation}) {
  // These are the values that
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

  // TODO: Add hooks for when filter and sort options are selected (first one added)
  const [refresh, setRefresh] = useState(false);

  // TODO: Write a useEffect function to do a new query once new options are selected (will run when a menu closes, since refresh will be set to true)
  useEffect(() => {
    if (refresh) {
      // TODO: call new querey here
      setRefresh(false);
    }
  }, [refresh]);

  // This useQuery runs on first render
  const {data, loading, error, fetchMore} = useQuery(
      {listStores},
      {variables: {limit: 10}},
      getNames({listStores}),
  );

  const _renderStore = ({store}) => {
    // TODO: Write render code for what each store will display and what happens when pressed
  };

  const _keyExtractor = (obj) => obj.id.toString();

  if (loading) {
    return (
        <View>
          <Text style={{alignSelf: 'center'}}>Loading Stores</Text>
          <ActivityIndicator />
        </View>
    );
  }
  if (error) {
    return (
        <View>
          <Text style={{alignSelf: 'center'}}>Please relaunch app</Text>
        </View>
    );
  }

  return (
      <View>
        {/* TODO: Need to add title and filter selection menus, need to add filter state variables above*/}
        <FlatList
            data={data}
            renderItem={_renderStore}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.5}
            keyExtractor={_keyExtractor}
        />
      </View>
  );
}

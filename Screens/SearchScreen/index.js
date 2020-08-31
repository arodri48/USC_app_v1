import React, {useContext, useEffect, useReducer, useRef, useState} from 'react';
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
  // These are the hooks for store values, will be updated if a store is pressed
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

  // Hooks for toggling filter and sort menus
  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilterOverlay = () => {
    setFilterVisible(!filterVisible);
  };
  const [sortVisible, setSortVisible] = useState(false);
  const toggleSortOverlay = () => {
    setSortVisible(!sortVisible);
  };

  // Hooks for filter options
  const [food, setFood] = useState(false);
  const [books, setBooks] = useState(false);
  const [clothing_jewlery_hair, setClothingJewleryHair] = useState(false);
  const [beauty_health, setBeautyHealth] = useState(false);
  // Hooks for sort options
  const [sortOption, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'HIGH_TO_LOW':
          return {
            high_to_low: true,
            low_to_high: false,
            new_releases: false,
            featured: false,
          };
        case 'LOW_T0_HIGH':
          return {
            high_to_low: false,
            low_to_high: true,
            new_releases: false,
            featured: false,
          };
        case 'NEW_RELEASES':
          return {
            high_to_low: false,
            low_to_high: false,
            new_releases: true,
            featured: false,
          };
        case 'FEATURED':
          return {
            high_to_low: false,
            low_to_high: false,
            new_releases: false,
            featured: true,
          };
      }
    },
    {
      high_to_low: false,
      low_to_high: false,
      new_releases: false,
      featured: false,
    },
  );

  // Hook for determining whether to run update search, will be switched to true
  // anytime a filter or sort option is changed
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

import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {InfoContext} from '../../Provider/InfoProvider';
import {API, graphqlOperation} from 'aws-amplify';
import {listStores} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import {Button, OverLay, CheckBox} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {Accordion} from 'dooboo-ui';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  // These are the hooks for store values, will be updated if a store is pressed
  const [
    setStoreName,
    setStoreID,
    setStateLocation,
    setBio,
    setPrice,
    setWebsite,
    setGoodsType,
    setImage,
  ] = useContext(InfoContext);

  // Hooks for toggling filter and sort menus
  const [filterVisible, setFilterVisible] = useState(false);
  const toggleFilterOverlay = () => {
    setFilterVisible(!filterVisible);
    if (!filterVisible) {
      setRefresh(true);
    }
  };
  const [sortVisible, setSortVisible] = useState(false);
  const toggleSortOverlay = () => {
    setSortVisible(!sortVisible);
    if (!sortVisible) {
      setRefresh(true);
    }
  };

  // Hooks for filter options
  const [filterOption, filterDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'FOOD':
          return {
            food: true,
            books: false,
            clothing_jewlery_hair: false,
            beauty_health: false,
          };
        case 'BOOKS':
          return {
            food: false,
            books: true,
            clothing_jewlery_hair: false,
            beauty_health: false,
          };
        case 'CLOTHING':
          return {
            food: false,
            books: false,
            clothing_jewlery_hair: true,
            beauty_health: false,
          };
        case 'BEAUTY_HEALTH':
          return {
            food: false,
            books: false,
            clothing_jewlery_hair: false,
            beauty_health: true,
          };
      }
    },
    {
      food: false,
      books: false,
      clothing_jewlery_hair: false,
      beauty_health: false,
    },
  );

  const filter_dict = {
    'FOOD': {bool_val: filterOption.food, title: 'Food'},
    'BOOKS': {bool_val: filterOption.books, title: 'Books'},
    'CLOTHING': {bool_val: filterOption.clothing_jewlery_hair, title: 'Clothing'},
    'BEAUTY_HEALTH': {bool_val: filterOption.beauty_health, title: 'Beauty and Health'},
  };

  // Hooks for sort options
  const [sortOption, sortDispatch] = useReducer(
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

  const sort_dict = {
    'HIGH_TO_LOW': {bool_val: sortOption.high_to_low, title: 'High to Low'},
    'LOW_T0_HIGH': {bool_val: sortOption.low_to_high, title: 'Low to High'},
    'NEW_RELEASES': {bool_val: sortOption.new_releases, title: 'New Releases'},
    'FEATURED': {bool_val: sortOption.featured, title: 'Featured'},
  };

  // Hook for determining whether to run update search, will be switched to true
  // anytime a filter or sort option is changed
  const [refresh, setRefresh] = useState(false);

  const [stores, setStores] = useState([]);
  const [pageToken, setPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageTokenRef = useRef();
  const storesRef = useRef();
  //Initial useEffect to load in data
  useEffect(() => {
    async function fetchStores() {
      try {
        const storeData = await API.graphql({
          query: listStores,
          variables: {
            limit: 10,
          },
        });
        const newStores = storeData.data.listStores.items;
        const newPageToken = storeData.data.listStores.nextToken;

        setPageToken(newPageToken);
        setStores(newStores);
        pageTokenRef.current = newStores;
        storesRef.current = newPageToken;
        setLoading(false);
      } catch (err) {
        console.log('error fetching stores');
      }
    }
    fetchStores();
  }, []);
  // useEffect function to do a new query once new options are selected (will run when a menu closes, since refresh will be set to true)
  useEffect(() => {
    async function fetchStores() {
      try {
        const storeData = await API.graphql({
          query: listStores,
          variables: {
            limit: 10,
          },
        });
        const newStores = storeData.data.listStores.items;
        const newPageToken = storeData.data.listStores.nextToken;

        setPageToken(newPageToken);
        setStores(newStores);
        pageTokenRef.current = newStores;
        storesRef.current = newPageToken;
        setLoading(false);
      } catch (err) {
        console.log('error fetching stores');
      }
    }
    if (refresh) {
      setLoading(true);
      setStores([]);
      setPageToken(null);
      fetchStores();
      setRefresh(false);
    }
  }, [refresh, pageTokenRef, storesRef]);
  // useEffect for loading more
  useEffect(() => {
    async function fetchStores() {
      try {
        const storeData = await API.graphql({
          query: listStores,
          variables: {
            limit: 10,
            nextToken: pageTokenRef.current,
          },
        });
        const newStores = storeData.data.listStores.items;
        const newPageToken = storeData.data.listStores.nextToken;
        setPageToken(newPageToken);
        pageTokenRef.current = newPageToken;
        setStores([...storesRef.current, ...newStores]);
        storesRef.current = [...storesRef.current, ...newStores];
        setLoading(false);
      } catch (err) {
        console.log('error fetching stores');
      }
    }
    if (loadingMore) {
      fetchStores();
      setLoadingMore(false);
    }
  }, [loadingMore, pageTokenRef, storesRef]);

  const _renderStore = ({store}) => {
    const storePressHandler = () => {
      // set InfoProvider variables to equal the store's attributes
      setStoreName(store.storeName);
      setStoreID(store.id);
      setStateLocation(store.stateLocation);
      setBio(store.bio);
      setPrice(store.PricePoint);
      setWebsite(store.website);
      setGoodsType(store.goodsType);
      setImage(store.image);
      // navigate to storescreen
      navigation.navigate('StoreScreen');
    };
    return (
      <TouchableOpacity
        style={{backgroundColor: 'pink'}}
        onPress={storePressHandler}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{store.storeName}</Text>
          <Text>{store.PricePoint}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{width: 100, height: 100}}
            source={{
              uri: store.image,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>store.bio</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const _keyExtractor = (obj) => obj.id.toString();

  const _renderFooter = () => {
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

  const _handleLoadMore = () => {
    pageTokenRef.current = pageToken;
    storesRef.current = stores;
    setLoadingMore(true);
  };

  const filter_data = [
    {
      title: 'Shop by Category',
      bodies: ['FOOD', 'BOOKS', 'CLOTHING', 'BEAUTY_HEALTH'],
    },
  ];

  return !loading ? (
    <View style={styles.mainContatiner}>
      <Text style={styles.sendASmile}>Send A Smile</Text>
      <Text style={styles.text}>A UniSelfCare Program</Text>
      <FastImage source={ImageList.Smile} />
      <View style={styles.FilterSortMenuContainer}>
        <Button title="Filter" onPress={toggleFilterOverlay} />

        <Button title="Sort" onPress={toggleSortOverlay} />
      </View>
      <OverLay
        isVisible={filterVisible}
        fullscreen={false}
        onBackdropPress={toggleFilterOverlay}
        overlayStyle={styles.filterMenu}>
        <Accordion
          data={filter_data}
          shouldAnimate={true}
          collapseOnStart={true}
          animDuration={300}
          activeOpacity={1}
          renderTitle={(item) => <Text style={{color: 'white'}}>{item}</Text>}
          renderBody={(item) =>
            <CheckBox
              
          }
          titleContainerStyle={{
            backgroundColor: 'gray',
          }}
          bodyContainerStyle={{
            backgroundColor: 'lightgray',
          }}
        />
      </OverLay>
      <OverLay
        isVisible={sortVisible}
        fullscreen={false}
        onBackdropPress={toggleSortOverlay}
        overlayStyle={styles.sortMenu}>
        <Text>Sort Menu</Text>
      </OverLay>
      {/* TODO: Need to add title and filter selection menus, need to add filter state variables above*/}
      <FlatList
        data={stores}
        renderItem={_renderStore}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.5}
        keyExtractor={_keyExtractor}
        initialNumToRender={10}
        ListFooterComponent={_renderFooter}
      />
    </View>
  ) : (
    <View>
      <Text style={{alignSelf: 'center'}}>Loading Stores</Text>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  FilterSortMenuContainer: {
    flexDirection: 'row',
  },
  filterMenu: {
    height: 400,
    width: 400,
  },
  sortMenu: {
    height: 400,
    width: 400,
  },
  sendASmile: {
    color: '#FCC6DF',
    fontSize: 45,
    fontWeight: 'bold',
    paddingBottom: 45,
    fontFamily: 'Raleway-SemiBold',
  },
  text: {
    color: '#535358',
    fontSize: 25,
    paddingTop: 10,
  },
});

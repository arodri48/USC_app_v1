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
import {storesByPrice} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import {Button, OverLay, CheckBox} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {List} from 'react-native-paper';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  // Hooks for store values
  const {
    setStoreName,
    setStoreID,
    setStateLocation,
    setBio,
    setPrice,
    setWebsite,
    setGoodsType,
    setImage,
    setCause,
  } = useContext(InfoContext);
  // Hooks for filter values
  const [filterVisible, setFilterVisible] = useState(false);
  //const [filterAltered, setFilterAltered] = useState(false);
  const causeRef = useRef('');
  const toggleFilterOverlay = () => {
    setFilterVisible(!filterVisible);
    if (causeRef.current !== currentCause && !filterVisible) {
      causeRef.current = currentCause;
      setRefresh(true);
    }
  };
  const [currentCause, setCurrentCause] = useState('');
  // Hooks for filter options
  const [filterOption, filterDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'BLM':
          if (filterOption.BLM) {
            setCurrentCause('');
            return {
              ...prevState,
              BLM: false,
            };
          } else {
            setCurrentCause('BLM');
            return {
              mental_health: false,
              BLM: true,
            };
          }
        case 'Mental Health':
          if (filterOption.mental_health) {
            setCurrentCause('');
            return {
              ...prevState,
              mental_health: false,
            };
          } else {
            setCurrentCause('Mental Health');
            return {
              mental_health: true,
              BLM: false,
            };
          }
      }
    },
    {
      BLM: false,
      mental_health: false,
    },
  ); // Hooks for sort values
  const [sortVisible, setSortVisible] = useState(false);
  //const [sortAltered, setSortAltered] = useState(false);
  const sortRef = useRef('ASC');
  const toggleSortOverlay = () => {
    setSortVisible(!sortVisible);
    if (sortRef.current !== currentSort && !sortVisible) {
      sortRef.current = currentSort;
      setRefresh(true);
    }
  };
  const [currentSort, setCurrentSort] = useState('ASC');
  const [sortOption, sortDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'HIGH_TO_LOW':
          if (sortOption.high_to_low) {
            setCurrentSort('ASC');
            return {
              high_to_low: false,
              low_to_high: true,
            };
          } else {
            setCurrentSort('DESC');
            return {
              high_to_low: true,
              low_to_high: false,
            };
          }
        case 'LOW_T0_HIGH':
          if (sortOption.low_to_high) {
            setCurrentSort('DESC');
            return {
              high_to_low: true,
              low_to_high: false,
            };
          } else {
            setCurrentSort('ASC');
            return {
              high_to_low: false,
              low_to_high: true,
            };
          }
      }
    },
    {
      high_to_low: false,
      low_to_high: true,
    },
  );

  // Hooks for managing store list
  const [refresh, setRefresh] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageTokenRef = useRef();
  const storesRef = useRef([]);

  //Initial useEffect to load in data
  useEffect(() => {
    async function fetchStores() {
      try {
        let storeData;
        if (causeRef.current === '') {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
        } else {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              cause: causeRef.current,
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
        }

        pageTokenRef.current = storeData.data.storesByPrice.nextToken;
        storesRef.current = storeData.data.storesByPrice.items;
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStores();
  }, []);
  // useEffect function to do a new query once new options are selected (will run when a menu closes, since refresh will be set to true)
  useEffect(() => {
    async function fetchStores() {
      try {
        let storeData;
        if (causeRef.current === '') {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
        } else {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              cause: causeRef.current,
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
        }
        pageTokenRef.current = storeData.data.storesByPrice.nextToken;
        storesRef.current = storeData.data.storesByPrice.items;
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (refresh) {
      setLoading(true);
      fetchStores();
      setRefresh(false);
    }
  }, [refresh, pageTokenRef, storesRef]);
  // useEffect for loading more
  useEffect(() => {
    async function fetchStores() {
      try {
        let storeData;
        if (causeRef.current === '') {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              limit: 10,
              sortDirection: sortRef.current,
              nextToken: pageTokenRef.current,
            }),
          );
        } else {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              cause: causeRef.current,
              limit: 10,
              sortDirection: sortRef.current,
              nextToken: pageTokenRef.current,
            }),
          );
        }
        const newStores = storeData.data.storesByPrice.items;
        pageTokenRef.current = storeData.data.storesByPrice.nextToken;
        storesRef.current = [...storesRef.current, ...newStores];
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    if (loadingMore) {
      fetchStores();
      setLoadingMore(false);
    }
  }, [loadingMore, pageTokenRef, storesRef]); // Functions called upon by render
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
      setCause(store.cause);
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
          <Text>store.cause</Text>
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
    setLoadingMore(true);
  };

  const [causeFilterExpanded, setCauseFilterExpanded] = useState(true);
  const handleCauseFilterPress = () =>
    setCauseFilterExpanded(!causeFilterExpanded);

  // Render return
  return !loading ? (
    <View style={styles.MainContainer}>
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
        <List.Accordion
          title="Filter By Cause"
          expanded={causeFilterExpanded}
          onPress={handleCauseFilterPress}>
          <CheckBox
            title="BLM"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={filterOption.BLM}
            onPress={() => filterDispatch('BLM')}
          />
          <CheckBox
            title="Mental Health"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={filterOption.mental_health}
            onPress={() => filterDispatch('Mental Health')}
          />
        </List.Accordion>
      </OverLay>
      <OverLay
        isVisible={sortVisible}
        fullscreen={false}
        onBackdropPress={toggleSortOverlay}
        overlayStyle={styles.sortMenu}>
        <Button
          title="Prices High to Low"
          containterStyle={{
            backgroundColor: sortOption.high_to_low ? 'green' : 'transparent',
          }}
          onPress={() => sortDispatch('HIGH_TO_LOW')}
        />
        <Button
          title="Prices Low to High"
          containterStyle={{
            backgroundColor: sortOption.low_to_high ? 'green' : 'transparent',
          }}
          onPress={() => sortDispatch('LOW_TO_HIGH')}
        />
      </OverLay>
      <FlatList
        data={storesRef.current}
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

// TODO:  create objects , then test and restyle

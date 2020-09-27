import React, {useEffect, useReducer, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
    Platform
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listAllStoresByPrice} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import {Button, CheckBox, Overlay} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  function objectMap(object, mapFn) {
    return Object.keys(object).reduce(function (result, key) {
      result[key] = mapFn(key);
      return result;
    }, {});
  }
  // Hooks for filter values
  const [filterApply, setFilterApply] = useState(false);
  const [filterCancel, setFilterCancel] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const causeRef = useRef('');
  const toggleFilterOverlay = () => {
    setFilterVisible(!filterVisible);
    if (causeRef.current !== currentCause){
      if (filterApply){
        causeRef.current = currentCause;
        setFilterApply(false);

        setRefresh(true);
      }
      else{
        if (causeRef.current !== ''){
          filterDispatch({type: filter_reset_dict[causeRef.current]});
        }
        else{
          filterDispatch({type:'CLEAR_ALL'});
        }
        setFilterCancel(false);
      }
    }
    else{
      if (filterApply){
        setFilterApply(false);
      }
      else{
        setFilterCancel(false);
      }
    }
  };
  /*
  useEffect(() => {
    if (!filterVisible){

    }
  }, [filterVisible])
   */
  const filter_reset_dict = {
    'BLM': 'CANCEL_RESET_TO_BLM',
    'Mental Health': 'CANCEL_RESET_TO_MENTAL_HEALTH',
    'Cancer': 'CANCEL_RESET_TO_CANCER',
    'Woman Led': 'CANCEL_RESET_TO_WOMAN_LED'
  }
  const [currentCause, setCurrentCause] = useState('');
  // Hooks for filter options
  const [filterOption, filterDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'CANCEL_RESET_TO_BLM':
          setCurrentCause('BLM');
          return {
            BLM: true,
            mental_health: false,
            cancer: false,
            woman_led: false,
          }
        case 'CANCEL_RESET_TO_MENTAL_HEALTH':
          setCurrentCause('Mental Health');
          return {
            BLM: false,
            mental_health: true,
            cancer: false,
            woman_led: false,
          }
        case 'CANCEL_RESET_TO_CANCER':
          setCurrentCause('Cancer');
          return {
            BLM: false,
            mental_health: false,
            cancer: true,
            woman_led: false,
          }
        case 'CANCEL_RESET_TO_WOMAN_LED':
          setCurrentCause('Woman Led')
          return {
            BLM: false,
            mental_health: false,
            cancer: false,
            woman_led: true,
          }
        case 'BLM':
          if (prevState.BLM) {
            setCurrentCause('');
            return {
              ...prevState,
              BLM: false,
            };
          } else {
            setCurrentCause('BLM');
            return objectMap(prevState, function (key) {
              return key === 'BLM';
            });
          }
        case 'Mental Health':
          if (prevState.mental_health) {
            setCurrentCause('');
            return {
              ...prevState,
              mental_health: false,
            };
          } else {
            setCurrentCause('Mental Health');
            return objectMap(prevState, function (key) {
              return key === 'mental_health';
            });
          }
        case 'Cancer':
          if (prevState.cancer) {
            setCurrentCause('');
            return {
              ...prevState,
              cancer: false,
            };
          } else {
            setCurrentCause('Cancer');
            return objectMap(prevState, function (key) {
              return key === 'cancer';
            });
          }
        case 'Woman Led':
          if (prevState.woman_led) {
            setCurrentCause('');
            return {
              ...prevState,
              woman_led: false,
            };
          } else {
            setCurrentCause('Woman Led');
            return objectMap(prevState, function (key) {
              return key === 'woman_led';
            });
          }
        case 'CLEAR_ALL':
          setCurrentCause('');
          console.log("Really is clearing all")
          return {
            BLM: false,
            mental_health: false,
            cancer: false,
            woman_led: false,
          }

        default:
          return prevState;
      }
    },
    {
      BLM: false,
      mental_health: false,
      cancer: false,
      woman_led: false,
    },
  );

  // Hooks for sort values
  const [sortApply, setSortApply] = useState(false);
  const [sortCancel, setSortCancel] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const sortRef = useRef('ASC');
  const toggleSortOverlay = () => {
    setSortVisible(!sortVisible);
    if (sortRef.current !== currentSort){
      if (sortApply){
        sortRef.current = currentSort;
        setSortApply(false);
        setRefresh(true);
      }
      else{
        sortDispatch({type: sort_reset_dict[sortRef.current]});
        setSortCancel(false);
      }
    }
    else {
      if (sortApply){
        setSortApply(false);
      }
      else{
        setSortCancel(false);
      }
    }

  };
  const sort_reset_dict = {
    'ASC': 'CANCEL_RESET_TO_LOW_TO_HIGH',
    'DESC': 'CANCEL_RESET_TO_HIGH_TO_LOW'
  }
  const [currentSort, setCurrentSort] = useState('ASC');
  const [sortOption, sortDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'CANCEL_RESET_TO_LOW_TO_HIGH':
          setCurrentSort('ASC');
          return {
            high_to_low: false,
            low_to_high: true,
          };
        case 'CANCEL_RESET_TO_HIGH_TO_LOW':
          setCurrentSort('DESC');
          return {
            high_to_low: true,
            low_to_high: false
          };
        case 'HIGH_TO_LOW':
          if (prevState.high_to_low) {
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
        case 'LOW_TO_HIGH':
          if (prevState.low_to_high) {
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
        default:
          return prevState;
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
  // const storesRef = useRef([]);
  const [stores, setStores] = useState([]);
  //Initial useEffect to load in data
  useEffect(() => {
    async function fetchStores() {
      let storeData;
      if (causeRef.current !== '') {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
            filter: {
              cause: {
                eq: causeRef.current,
              },
            },
          }),
        );
      } else {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
          }),
        );
      }
      return storeData;
    }
    fetchStores()
      .then((storeData) => {
        pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
        setStores(storeData.data.listAllStoresByPrice.items);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect for loading more
  useEffect(() => {
    async function fetchStores() {
      let storeData;
      if (causeRef.current !== '') {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            nextToken: pageTokenRef.current,
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
            filter: {
              cause: {
                eq: causeRef.current,
              },
            },
          }),
        );
      } else {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            nextToken: pageTokenRef.current,
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
          }),
        );
      }
      return storeData;
    }

    if (loadingMore) {
      //console.log('this ran');
      fetchStores()
        .then((storeData) => {
          //console.log(storeData);
          pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
          //console.log(pageTokenRef.current);
          const newStores = storeData.data.listAllStoresByPrice.items;
          //console.log(newStores);
          setStores((prevStore) => [...prevStore, ...newStores]);
          setLoading(false);
          setLoadingMore(false);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, [loadingMore, pageTokenRef]); // Functions called upon by render

  // useEffect function to do a new query once new options are selected (will run when a menu closes, since refresh will be set to true)
  useEffect(() => {
    async function fetchStores() {
      let storeData;
      if (causeRef.current !== '') {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
            filter: {
              cause: {
                eq: causeRef.current,
              },
            },
          }),
        );
      } else {
        storeData = API.graphql(
          graphqlOperation(listAllStoresByPrice, {
            limit: 15,
            listAll: 'Y',
            sortDirection: sortRef.current,
          }),
        );
      }
      return storeData;
    }

    if (refresh) {
      setLoading(true);
      fetchStores()
        .then((storeData) => {
          pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
          setStores(storeData.data.listAllStoresByPrice.items);
          setLoading(false);
          setRefresh(false);
        })
        .catch((err) => {
          //console.log(err);
        });
    }
  }, [refresh, pageTokenRef]);

  const _keyExtractor = (obj) => obj.id.toString();

  const _renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View style={styles.footerStyle}>
        <ActivityIndicator size="small" color="pink" />
      </View>
    );
  };

  const _handleLoadMore = () => {
    if (pageTokenRef.current !== null && !loadingMore) {
      //console.log('Loading more');
      setLoadingMore(true);
    }
  };

  const _renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('StoreScreen', item);
      }}>
      <View style={styles.storeContainer}>
        <FastImage
          style={styles.storeImage}
          source={{
            uri: item.image,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.storeText}>
          <Text>{item.storeName}</Text>
          <Text>{item.PricePoint}</Text>
          <Text>{item.cause}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const onPressSortApply = () => {
    setSortApply(true);
  }
  const onPressSortCancel = () => {
    setSortCancel(true);
  }
  useEffect(() => {
    if (sortApply || sortCancel){
      toggleSortOverlay();
    }
  }, [sortApply, sortCancel]);

  const onPressFilterApply = () => {
    setFilterApply(true);
  }
  const onPressFilterCancel = () => {
    setFilterCancel(true);
  }
  useEffect(() => {
    if (filterApply || filterCancel){
      toggleFilterOverlay();
    }
  }, [filterApply, filterCancel]);
  // Render return
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.smileContainer}>
        <FastImage
            source={ImageList.full_send_a_smile_logo}
            style={styles.smileImage}
            resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.FilterSortMenuContainer}>
        <Button
          title="Filter"
          onPress={toggleFilterOverlay}
          buttonStyle={styles.filterSortButtonStyle}
          titleStyle={styles.filterSortTitleStyle}
        />

        <Button
          title="Sort"
          onPress={toggleSortOverlay}
          buttonStyle={styles.filterSortButtonStyle}
          titleStyle={styles.filterSortTitleStyle}
        />
      </View>
      <Overlay
        onBackdropPress={onPressFilterCancel}
        overlayStyle={styles.filterMenu}
        isVisible={filterVisible}>
        <View style={styles.overlayContainer}>
          <View >
            <Text style={styles.filterText}>Filter By Cause</Text>
            <CheckBox
                title="BLM"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={filterOption.BLM}
                onPress={() => filterDispatch({type: 'BLM'})}
            />
            <CheckBox
                title="Mental Health"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={filterOption.mental_health}
                onPress={() => filterDispatch({type: 'Mental Health'})}
            />
            <CheckBox
                title="Cancer"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={filterOption.cancer}
                onPress={() => filterDispatch({type: 'Cancer'})}
            />
            <CheckBox
                title="Woman Led"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={filterOption.woman_led}
                onPress={() => filterDispatch({type: 'Woman Led'})}
            />
          </View>
          <View style={styles.buttonRowContainer}>
            <Button title='Cancel' onPress={onPressFilterCancel}/>
            <Button title='Apply' onPress={onPressFilterApply}/>
          </View>
        </View>

      </Overlay>
      <Overlay
        isVisible={sortVisible}
        onBackdropPress={toggleSortOverlay}
        overlayStyle={styles.sortMenu}>
        <View style={styles.overlayContainer}>
          <View>
            <Text style={styles.filterText}>Sort By Price</Text>
            <CheckBox
                checked={sortOption.high_to_low}
                title="Prices High to Low"
                onPress={() => sortDispatch({type: 'HIGH_TO_LOW'})}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
            />
            <CheckBox
                checked={sortOption.low_to_high}
                title="Prices Low to High"
                onPress={() => sortDispatch({type: 'LOW_TO_HIGH'})}
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
            />
          </View>

          <View style={styles.buttonRowContainer}>
            <Button title='Cancel' onPress={onPressSortCancel}/>
            <Button title='Apply' onPress={onPressSortApply}/>
          </View>
        </View>
      </Overlay>
      {!loading ? (
        <View style={styles.listParentContainer}>
          <FlatList
            data={stores}
            renderItem={_renderItem}
            onEndReached={_handleLoadMore}
            onEndReachedThreshold={0.5}
            keyExtractor={_keyExtractor}
            initialNumToRender={6}
            ListFooterComponent={_renderFooter}
            getItemLayout={(data, index) => ({
              length: 150,
              offset: 150 * index,
              index,
            })}
          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="pink" size="small" />
          <Text>Loading</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  buttonRowContainer: {width: '50%', height:50, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', alignSelf: 'flex-end'},
  overlayContainer: {
    flex:1,
    justifyContent: 'space-between'
  },
  filterSortTitleStyle: {
    color: 'black',
  },
  filterSortButtonStyle: {
    backgroundColor: 'transparent',
  },
  itemContainer: {
    backgroundColor: 'pink',
    width: 300,
    height: 150,
    marginBottom: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  storeContainer: {
    flexDirection: 'row',
    width: 250,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeImage: {width: 100, height: 100},
  storeText: {justifyContent: 'space-between', width: 120, height: 100,},
  textHeaderContainer: {alignItems: 'center', justifyContent: 'center'},
  smileContainer: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35
  },
  smileImage: {
    alignSelf: 'center',
    height: 60,
    width: '100%',

  },
  listParentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  FilterSortMenuContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
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
    color: '#fcc6df',
    fontSize: 28,
    paddingBottom: 0,
    fontFamily: Platform.OS === "ios" ? 'Raleway-SemiBold' : 'raleway_semibold.ttf',
  },
  text: {
    color: '#535358',
    fontSize: 9,
    marginTop: -10,
  },
  footerStyle: {
    position: 'relative',
    width: width,
    height: 100,
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 19,
  }
});

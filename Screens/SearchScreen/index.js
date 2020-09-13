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
import {listStores, storesByPrice} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import {Button, Overlay, CheckBox} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';

const {width, height} = Dimensions.get('window');

export default function SearchScreen({navigation}) {
  // Hooks for store values
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
  const [storeNameValue, setStoreNameValue] = storeName;
  const [storeIDValue, setStoreIDValue] = storeID;
  const [storeLocationValue, setStoreLocationValue] = stateLocation;
  const [bioValue, setBioValue] = bio;
  const [priceValue, setPriceValue] = price;
  const [websiteValue, setWebsiteValue] = website;
  const [goodsTypeValue, setGoodsTypeValue] = goodsType;
  const [imageValue, setImageValue] = image;
  const [causeValue, setCauseValue] = cause;






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
          if (prevState.BLM) {
            setCurrentCause('');
            return {
              ...prevState,
              BLM: false,
            };
          } else {
            setCurrentCause('BLM');
            return {
              ...prevState,
              mental_health: false,
              BLM: true,
              cancer: false
            };
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
            return {
              ...prevState,
              mental_health: true,
              BLM: false,
              cancer : false
            };
          }
        case 'Cancer':
          if (prevState.cancer){
            setCurrentCause('');
            return{
              ...prevState,
              cancer: false,
            };
          }
          else {
            setCurrentCause('Cancer');
            return {
              ...prevState,
              cancer: true,
              BLM: false,
              mental_health: false,
            }
          }
        default:
          return prevState;
      }
    },
    {
      BLM: false,
      mental_health: false,
      cancer: false
    },
  );
  /*
  useEffect(() => {
    console.log(filterOption);
  }, [filterOption]);
  */
  // Hooks for sort values
  const [sortVisible, setSortVisible] = useState(false);
  //const [sortAltered, setSortAltered] = useState(false);
  const sortRef = useRef("ASC");
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
          if (prevState.high_to_low) {
            setCurrentSort('ASC');
            return {
              ...prevState,
              high_to_low: false,
              low_to_high: true,
            };
          } else {
            setCurrentSort('DESC');
            return {
              ...prevState,
              high_to_low: true,
              low_to_high: false,
            };
          }
        case 'LOW_TO_HIGH':
          if (prevState.low_to_high) {
            setCurrentSort('DESC');
            return {
              ...prevState,
              high_to_low: true,
              low_to_high: false,
            };
          } else {
            setCurrentSort('ASC');
            return {
              ...prevState,
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
  /*
  useEffect(() => {
    console.log(sortOption);
  }, [sortOption])
  */
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
        //console.log(causeRef.current)
        storeData = await  API.graphql(graphqlOperation(listStores));
        /*
        if (causeRef.current === '') {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
          console.log(storeData)
        } else {
          storeData = await API.graphql(
            graphqlOperation(storesByPrice, {
              cause: causeRef.current,
              limit: 10,
              sortDirection: sortRef.current,
            }),
          );
        }
         */

        pageTokenRef.current = storeData.data.listStores.nextToken;
        storesRef.current = storeData.data.listStores.items;
        //console.log(storesRef.current)
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStores();
  }, []);
  /*
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

   */
  const storePressHandler = ({storeName, id, stateLocation, bio, PricePoint, website, goodsType, image, cause}) => {
    // set InfoProvider variables to equal the store's attributes
    setStoreNameValue(storeName);
    setStoreIDValue(id);
    setStoreLocationValue(stateLocation);
    setBioValue(bio);
    setPriceValue(PricePoint);
    setWebsiteValue(website);
    setGoodsTypeValue(goodsType);
    setImageValue(image);
    setCauseValue(cause);
    // navigate to storescreen
    navigation.navigate("StoreScreen");
  };
  /*
  const _renderStore = ({store}) => {
    const storePressHandler = () => {
      // set InfoProvider variables to equal the store's attributes
      setStoreName(store["storeName"]);
      setStoreID(store["id"]);
      setStateLocation(store["stateLocation"]);
      setBio(store["bio"]);
      setPrice(store["PricePoint"]);
      setWebsite(store["website"]);
      setGoodsType(store["goodsType"]);
      setImage(store["image"]);
      setCause(store["cause"]);
      // navigate to storescreen
      navigation.navigate('StoreScreen');
    };
    return (
      <TouchableOpacity
        style={{backgroundColor: 'pink'}}
        onPress={storePressHandler}
      >
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text>{store["storeName"]}</Text>
          <Text>{store["PricePoint"]}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <FastImage
            style={{width: 100, height: 100}}
            source={{
              uri: store["image"],
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text>{store["cause"]}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  */
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
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.sendASmile}>Send A Smile</Text>
        <Text style={styles.text}>A UniSelfCare Program</Text>
      </View>
      <View style={{width: '100%',
        height: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'blue'
        }}>
        <FastImage
            source={ImageList.Smile}
            style={{alignSelf: 'center',
            height: 300,
            width: 400,
              marginLeft: 20,
              marginBottom: 10,
            }}
            resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.FilterSortMenuContainer}>
        <Button title="Filter" onPress={toggleFilterOverlay} buttonStyle={{backgroundColor : 'transparent'}} titleStyle={{color : 'black'}}/>

        <Button title="Sort" onPress={toggleSortOverlay} buttonStyle={{backgroundColor : 'transparent'}} titleStyle={{color : 'black'}}/>
      </View>
      <Overlay
          onBackdropPress={toggleFilterOverlay}
          overlayStyle={styles.filterMenu}
          isVisible={filterVisible}
      >
        <View>
          <CheckBox
              title="BLM"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filterOption["BLM"]}
              onPress={() => filterDispatch({type:'BLM'})}
          />
          <CheckBox
              title="Mental Health"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filterOption["mental_health"]}
              onPress={() => filterDispatch({type:'Mental Health'})}
          />
          <CheckBox
              title="Cancer"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checked={filterOption["cancer"]}
              onPress={() => filterDispatch({type:'Cancer'})}
          />
        </View>
      </Overlay>
      <Overlay
          isVisible={sortVisible}
          onBackdropPress={toggleSortOverlay}
          overlayStyle={styles.sortMenu}>
        <View>
          <CheckBox
              checked={sortOption.high_to_low}
              title='Prices High to Low'
              onPress={() => sortDispatch({type:'HIGH_TO_LOW'})}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
          />
          <CheckBox
              checked={sortOption.low_to_high}
              title='Prices Low to High'
              onPress={() => sortDispatch({type:'LOW_TO_HIGH'})}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
          />
        </View>
      </Overlay>
      <FlatList
          data={storesRef.current}
          renderItem={({item}) => (
              <TouchableOpacity
                  style={{backgroundColor: 'pink'}}
                  onPress={() => storePressHandler(item)}
              >
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text>{item["storeName"]}</Text>
                  <Text>{item["PricePoint"]}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <FastImage
                      style={{width: 100, height: 100}}
                      source={{
                        uri: item["image"],
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text>{item["cause"]}</Text>
                </View>
              </TouchableOpacity>
          )}
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
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  FilterSortMenuContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    marginTop: 18,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 25,
    fontWeight: 'bold',
    paddingBottom: 0,
    fontFamily: 'Raleway-SemiBold',
  },
  text: {
    color: '#535358',
    fontSize: 12,
    marginTop: -10
  },
});

// TODO:  create objects , then test and restyle

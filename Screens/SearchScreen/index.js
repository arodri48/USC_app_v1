import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {listAllStoresByPrice} from '../../src/graphql/queries';
import FastImage from 'react-native-fast-image';
import {Button, CheckBox, Overlay} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';

export default function SearchScreen({navigation}) {
  function isEquivalent(a, b) {
    const aProps = Object.getOwnPropertyNames(a);
    const bProps = Object.getOwnPropertyNames(b);
    const aPropLen = aProps.length;
    const bPropLen = bProps.length;
    if (aPropLen !== bPropLen) {
      return false;
    }
    let propName;
    for (let i = 0; i !== aPropLen; ++i) {
      propName = aProps[i];
      if (a[propName] !== b[propName]) {
        return false;
      }
    }
    return true;
  }
  // Hooks for filter values
  const [filterApply, setFilterApply] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const causeRef = useRef({
    BLM: false,
    mental_health: false,
    cancer: false,
    woman_led: false,
    self_care: false,
  });
  const categoryRef = useRef({
    stationary: false,
    gifts: false,
    clothing: false,
    skincare_beauty: false,
  });
  // Hooks for filter options
  const [filterOption, filterDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESET':
          return action.data;
        case 'Self-Care':
          if (prevState.self_care) {
            return {
              ...prevState,
              self_care: false,
            };
          } else {
            return {
              ...prevState,
              self_care: true,
            };
          }
        case 'BLM':
          if (prevState.BLM) {
            return {
              ...prevState,
              BLM: false,
            };
          } else {
            return {
              ...prevState,
              BLM: true,
            };
          }
        case 'Mental Health':
          if (prevState.mental_health) {
            return {
              ...prevState,
              mental_health: false,
            };
          } else {
            return {
              ...prevState,
              mental_health: true,
            };
          }
        case 'Cancer':
          if (prevState.cancer) {
            return {
              ...prevState,
              cancer: false,
            };
          } else {
            return {
              ...prevState,
              cancer: true,
            };
          }
        case 'Woman Led':
          if (prevState.woman_led) {
            return {
              ...prevState,
              woman_led: false,
            };
          } else {
            return {
              ...prevState,
              woman_led: true,
            };
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
      self_care: false,
    },
  );
  const [filterCategoryOption, filterCategoryDispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESET':
          return action.data;
        case 'Planners/Notebooks':
          if (prevState.stationary) {
            return {
              ...prevState,
              stationary: false,
            };
          } else {
            return {
              ...prevState,
              stationary: true,
            };
          }
        case 'Gifts':
          if (prevState.gifts) {
            return {
              ...prevState,
              gifts: false,
            };
          } else {
            return {
              ...prevState,
              gifts: true,
            };
          }
        case 'Apparel':
          if (prevState.clothing) {
            return {
              ...prevState,
              clothing: false,
            };
          } else {
            return {
              ...prevState,
              clothing: true,
            };
          }
        case 'Beauty_Wellness':
          if (prevState.skincare_beauty) {
            return {
              ...prevState,
              skincare_beauty: false,
            };
          } else {
            return {
              ...prevState,
              skincare_beauty: true,
            };
          }
        default:
          return prevState;
      }
    },
    {stationary: false, gifts: false, clothing: false, skincare_beauty: false},
  );

  const toggleFilterOverlay = useCallback(() => {
    setFilterVisible((s) => !s);
    if (
      !isEquivalent(categoryRef.current, filterCategoryOption) ||
      !isEquivalent(causeRef.current, filterOption)
    ) {
      if (filterApply) {
        causeRef.current = filterOption;
        categoryRef.current = filterCategoryOption;
        setFilterApply(false);
        setRefresh(true);
      } else {
        filterDispatch({
          type: 'RESET',
          data: causeRef.current,
        });
        filterCategoryDispatch({
          type: 'RESET',
          data: categoryRef.current,
        });
      }
    }
  }, [filterApply, filterCategoryOption, filterOption]);

  // Hooks for sort values
  const [sortApply, setSortApply] = useState(false);
  const [sortVisible, setSortVisible] = useState(false);
  const sortRef = useRef('ASC');

  const [currentSort, setCurrentSort] = useState('ASC');
  const toggleSortOverlay = useCallback(() => {
    const sort_reset_dict = {
      ASC: 'CANCEL_RESET_TO_LOW_TO_HIGH',
      DESC: 'CANCEL_RESET_TO_HIGH_TO_LOW',
    };
    setSortVisible((s) => !s);
    if (sortRef.current !== currentSort) {
      if (sortApply) {
        sortRef.current = currentSort;
        setSortApply(false);
        setRefresh(true);
      } else {
        sortDispatch({type: sort_reset_dict[sortRef.current]});
      }
    }
  }, [currentSort, sortApply]);

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
            low_to_high: false,
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
  const pageTokenRef = useRef(null);
  // const storesRef = useRef([]);
  const [stores, setStores] = useState([]);
  //Initial useEffect to load in data
  const cause_dictionary = useMemo(() => {
    return {
      BLM: 'Black-Owned',
      mental_health: 'Mental Health',
      cancer: 'Cancer Awareness',
      woman_led: 'Woman-Owned',
      self_care: 'Self-Care',
    };
  }, []);
  const category_dictionary = useMemo(() => {
    return {
      stationary: 'Planners/Notebooks',
      gifts: 'Gifts',
      clothing: 'Apparel',
      skincare_beauty: 'Beauty/Wellness',
    };
  }, []);
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    function create_aws_format_filter(obj) {
      // create an empty array
      const filter_options = [];
      const aProps = Object.getOwnPropertyNames(obj);
      let propName;
      for (let i = 0, aPropLen = aProps.length; i !== aPropLen; ++i) {
        propName = aProps[i];
        if (obj[propName]) {
          filter_options.push({cause: {eq: cause_dictionary[propName]}});
        }
      }
      return {or: filter_options};
    }
    async function fetchStores() {
      const cause_filter_options = create_aws_format_filter(causeRef.current);
      if (!loadingMore) {
        // Fresh Inquiry
        if (cause_filter_options.or.length !== 0) {
          if (cause_filter_options.or.length > 1) {
            return API.graphql(
              graphqlOperation(listAllStoresByPrice, {
                limit: 100,
                listAll: 'Y',
                sortDirection: sortRef.current,
                filter: cause_filter_options,
              }),
            );
          } else {
            return API.graphql(
              graphqlOperation(listAllStoresByPrice, {
                limit: 100,
                listAll: 'Y',
                sortDirection: sortRef.current,
                filter: cause_filter_options.or[0],
              }),
            );
          }
        } else {
          return API.graphql(
            graphqlOperation(listAllStoresByPrice, {
              limit: 100,
              listAll: 'Y',
              sortDirection: sortRef.current,
            }),
          );
        }
      } else {
        if (cause_filter_options.or.length !== 0) {
          if (cause_filter_options.or.length > 1) {
            return API.graphql(
              graphqlOperation(listAllStoresByPrice, {
                nextToken: pageTokenRef.current,
                limit: 100,
                listAll: 'Y',
                sortDirection: sortRef.current,
                filter: cause_filter_options,
              }),
            );
          } else {
            return API.graphql(
              graphqlOperation(listAllStoresByPrice, {
                nextToken: pageTokenRef.current,
                limit: 100,
                listAll: 'Y',
                sortDirection: sortRef.current,
                filter: cause_filter_options.or[0],
              }),
            );
          }
        } else {
          return API.graphql(
            graphqlOperation(listAllStoresByPrice, {
              nextToken: pageTokenRef.current,
              limit: 100,
              listAll: 'Y',
              sortDirection: sortRef.current,
            }),
          );
        }
      }
    }
    function category_filter_stores(category_entries, store_list) {
      const new_stores_arr = [];
      for (let i = 0, store_len = store_list.length; i !== store_len; ++i) {
        for (
          let j = 0, filter_len = category_entries.length;
          j !== filter_len;
          ++j
        ) {
          if (category_entries[j][1]) {
            if (
              category_dictionary[category_entries[j][0]] ===
              store_list[i].goodsType
            ) {
              new_stores_arr.push(store_list[i]);
            }
          }
        }
      }
      return new_stores_arr;
    }
    if (refresh) {
      const category_entries = Object.entries(categoryRef.current);
      setLoading(true);
      fetchStores().then((storeData) => {
        pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
        const store_entries = storeData.data.listAllStoresByPrice.items;
        if (category_entries.some((k) => k[1])) {
          const new_stores_arr = category_filter_stores(
            category_entries,
            store_entries,
          );
          setStores(new_stores_arr);
        } else {
          setStores(store_entries);
        }
        setLoading(false);
        setRefresh(false);
      });
    } else if (loadingMore) {
      const category_entries = Object.entries(categoryRef.current);
      fetchStores().then((storeData) => {
        pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
        const store_entries = storeData.data.listAllStoresByPrice.items;
        if (category_entries.some((k) => k[1])) {
          const new_stores_arr = category_filter_stores(
            category_entries,
            store_entries,
          );
          setStores((prevStore) => [...prevStore, ...new_stores_arr]);
        } else {
          setStores((prevStore) => [...prevStore, ...store_entries]);
        }
        setLoading(false);
        setLoadingMore(false);
      });
    } else if (firstRender) {
      const category_entries = Object.entries(categoryRef.current);
      fetchStores().then((storeData) => {
        pageTokenRef.current = storeData.data.listAllStoresByPrice.nextToken;
        const store_entries = storeData.data.listAllStoresByPrice.items;
        if (category_entries.some((k) => k[1])) {
          const new_stores_arr = category_filter_stores(
            category_entries,
            store_entries,
          );
          setStores(new_stores_arr);
        } else {
          setStores(store_entries);
        }
        setLoading(false);
      });
      setFirstRender(false);
    }
  }, [
    refresh,
    loadingMore,
    firstRender,
    cause_dictionary,
    category_dictionary,
  ]);

  const _keyExtractor = useCallback((obj) => obj.id.toString(), []);

  const _renderFooter = () => {
    if (!loadingMore) {
      return null;
    }
    return (
      <View style={styles.footerStyle}>
        <ActivityIndicator size="small" color="#AF8DB3" />
      </View>
    );
  };

  const _handleLoadMore = () => {
    if (pageTokenRef.current !== null && !loadingMore) {
      setLoadingMore(true);
    }
  };

  const _renderItem = useCallback(
    ({item}) => (
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
            resizeMode={FastImage.resizeMode.contain}
          />
          <View style={styles.storeText}>
            <Text>
              <Text style={styles.boldText}>Shop Name: </Text>
              <Text>{item.storeName}</Text>
            </Text>
            <Text>
              <Text style={styles.boldText}>Category: </Text>
              <Text>{item.goodsType}</Text>
            </Text>
            <Text>
              <Text style={styles.boldText}>Cause: </Text>
              <Text>{item.cause}</Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [navigation],
  );

  const onPressSortApply = () => {
    setSortApply(true);
  };
  const onPressSortCancel = () => {
    toggleSortOverlay();
  };
  useEffect(() => {
    if (sortApply) {
      toggleSortOverlay();
      setSortApply(false);
    }
  }, [sortApply, toggleSortOverlay]);

  const onPressFilterApply = () => {
    setFilterApply(true);
  };
  const onPressFilterCancel = () => {
    toggleFilterOverlay();
  };
  useEffect(() => {
    if (filterApply) {
      toggleFilterOverlay();
      setFilterApply(false);
    }
  }, [filterApply, toggleFilterOverlay]);

  const [helpVisible, setHelpVisible] = useState(false);
  // Render return
  return (
    <SafeAreaView style={styles.MainContainer}>
      <View style={styles.smileContainer}>
        <View style={styles.counterView} />
        <FastImage
          source={ImageList.full_send_a_smile_logo}
          style={styles.smileImage}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Button
          icon={<Icon size={30} color="black" name="questioncircle" />}
          buttonStyle={styles.help_button}
          onPress={() => setHelpVisible(true)}
        />
      </View>
      <Overlay
        isVisible={helpVisible}
        onBackdropPress={() => setHelpVisible(false)}
        overlayStyle={styles.help_overlay}>
        <View style={styles.center_items}>
          <View style={styles.top_help_view}>
            <Text style={styles.whiteText}>Not sure how to begin?</Text>
            <Button
              icon={<Icon size={20} color="black" name="close" />}
              buttonStyle={styles.close_help}
              onPress={() => setHelpVisible(false)}
            />
          </View>
          <View style={styles.width_90}>
            <Text style={styles.whiteText}>
              - Click the Filter button on the left
            </Text>
            <Text style={styles.whiteText}>- Select product categories of interest</Text>
            <Text style={styles.whiteText}>
              - Select the causes and themes you wish to support
            </Text>
            <Text style={styles.whiteText}>
              - Scroll through our list of online shops
            </Text>
            <Text style={styles.whiteText}>
              - Tap the shop of your choice
            </Text>
            <Text style={styles.whiteText}>
              - Follow the link at the top of the shop's profile
            </Text>
            <Text style={styles.whiteText}>
              - Choose a gift and Send A Smile to someone in your life!
            </Text>
          </View>
        </View>
      </Overlay>

      <View style={styles.FilterSortMenuContainer}>
        <Button
          title="Filter"
          onPress={toggleFilterOverlay}
          buttonStyle={styles.filterSortButtonStyle}
          titleStyle={styles.filterSortTitleStyle}
        />
        <View style={styles.empty_view_filter_sort} />

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
          <ScrollView>
            <Text style={styles.filterText}>Filter By Category</Text>
            <CheckBox
              title="Planners/Notebooks"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterCategoryOption.stationary}
              onPress={() =>
                filterCategoryDispatch({type: 'Planners/Notebooks'})
              }
            />
            <CheckBox
              title="Gifts"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterCategoryOption.gifts}
              onPress={() => filterCategoryDispatch({type: 'Gifts'})}
            />
            <CheckBox
              title="Apparel"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterCategoryOption.clothing}
              onPress={() => filterCategoryDispatch({type: 'Apparel'})}
            />
            <CheckBox
              title="Beauty/Wellness"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterCategoryOption.skincare_beauty}
              onPress={() => filterCategoryDispatch({type: 'Beauty_Wellness'})}
            />
            <Text style={styles.filterText}>Filter By Cause/Theme</Text>
            <CheckBox
              title="Black-Owned"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterOption.BLM}
              onPress={() => filterDispatch({type: 'BLM'})}
            />
            <CheckBox
              title="Mental Health"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterOption.mental_health}
              onPress={() => filterDispatch({type: 'Mental Health'})}
            />
            <CheckBox
              title="Cancer Awareness"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterOption.cancer}
              onPress={() => filterDispatch({type: 'Cancer'})}
            />
            <CheckBox
              title="Woman-Owned"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
              checked={filterOption.woman_led}
              onPress={() => filterDispatch({type: 'Woman Led'})}
            />
            <CheckBox
              checked={filterOption.self_care}
              onPress={() => filterDispatch({type: 'Self-Care'})}
              checkedColor="#AF8DB3"
              uncheckedIcon="circle-o"
              checkedIcon="dot-circle-o"
              title="Self-Care"
            />
          </ScrollView>
          <View style={styles.buttonRowContainer}>
            <Button
              title="Cancel"
              buttonStyle={styles.applyCancelButtonStyle}
              onPress={onPressFilterCancel}
            />
            <Button
              title="Apply"
              buttonStyle={styles.applyCancelButtonStyle}
              onPress={onPressFilterApply}
            />
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
              checked={sortOption.low_to_high}
              title="Low to High"
              onPress={() => sortDispatch({type: 'LOW_TO_HIGH'})}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
            />
            <CheckBox
              checked={sortOption.high_to_low}
              title="High to Low"
              onPress={() => sortDispatch({type: 'HIGH_TO_LOW'})}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              checkedColor="#AF8DB3"
            />
          </View>

          <View style={styles.buttonRowContainer}>
            <Button
              title="Cancel"
              buttonStyle={styles.applyCancelButtonStyle}
              onPress={onPressSortCancel}
            />
            <Button
              title="Apply"
              buttonStyle={styles.applyCancelButtonStyle}
              onPress={onPressSortApply}
            />
          </View>
        </View>
      </Overlay>
      {!loading ? (
        <View style={styles.listParentContainer}>
          {stores.length !== 0 ? (
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
          ) : (
            <Text>No results matching criteria</Text>
          )}
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#AF8DB3" size="small" />
          <Text>Loading</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  empty_view_filter_sort: {width: '55%', height: 10},
  counterView: {width: 50, height: 50},
  help_button: {
    width: 50,
    height: 50,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  help_overlay: {
    width: '90%',
    backgroundColor: '#8bafaf',
    borderRadius: 20,
  },
  center_items: {alignItems: 'center'},
  top_help_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  close_help: {
    width: 40,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  width_90: {
    width: '90%',
  },
  whiteText: {
    color: 'white',
  },
  boldText: {
    fontWeight: 'bold',
  },
  buttonRowContainer: {
    width: '50%',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  filterSortTitleStyle: {
    color: 'white',
  },
  filterSortButtonStyle: {
    backgroundColor: '#AF8DB3',
    width: 60,
  },
  applyCancelButtonStyle: {
    backgroundColor: '#AF8DB3',
  },
  itemContainer: {
    backgroundColor: '#BFE3B4',
    width: 330,
    height: 150,
    marginBottom: 20,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  storeContainer: {
    flexDirection: 'row',
    width: 280,
    height: 120,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeImage: {width: 100, height: 100, backgroundColor: 'white'},
  storeText: {justifyContent: 'space-around', width: 170, height: 130},
  smileContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  smileImage: {
    alignSelf: 'flex-end',
    height: '90%',
    width: '60%',
  },
  listParentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 330,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingBottom: 5,
  },
  filterMenu: {
    height: '75%',
    width: '90%',
    backgroundColor: '#8bafaf',
    borderRadius: 20,
  },
  sortMenu: {
    height: '35%',
    width: '90%',
    backgroundColor: '#8bafaf',
    borderRadius: 20,
  },
  footerStyle: {
    width: 330,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 19,
    paddingLeft: 12,
    color: 'white',
  },
});

import React from 'react';
import {View, Text, Button, Dimensions} from 'react-native';
import {InfoContext} from '../../Provider/InfoProvider';
export default function SearchScreen({navigation}) {
    const { width, height } = Dimensions.get('window');

    const [storeName,
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
        setWebsite] = useContext(InfoContext);
    const flatListRef = useRef(null);
    const [stores, setStores] = useState([]);
    useEffect(() => {
        fetchTodos()
    }, [])
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);

    const renderFooter = () => {
        if (!loadingMore){
            return null;
        }
        return(
            <View
                style{{ position: 'relative',
            width: width,
            height: height,
            paddingVertical: 20,
            borderTopWidth: 1,
            marginTop: 10,
            marginBottom: 10,
            borderColor: 'pink'}}
                >
                <ActivityIndicator animating size="large"/>
            </View>
        );
    };
// need to implement renderItem, onEndReached, refreshing, and onRefresh; add a useEffect to reload/reset when search settings are altered
    
    //https://scotch.io/tutorials/implementing-an-infinite-scroll-list-in-react-native use this link for more reference on how to implement infinite scrolling
    // https://docs.amplify.aws/guides/api-graphql/graphql-pagination/q/platform/js#querying-from-a-javascript-application how to implement pagination for AWS Amplify
  return (
    <View>
        {/* Need to add title and filter selections, need to add filter state variables above*/}
        <FlatList data={stores} renderItem={} onEndReached={} refreshing={} onRefresh={} ListFooterComponent={renderFooter} onEndReachedThreshold={0.5} initialNumToRender={10} ref={flatListRef} keyExtractor={item => item.id.toString()}>

        </FlatList>
    </View>
  );
}


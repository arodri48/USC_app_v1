import React from 'react';
import {View, Text, Button} from 'react-native';
export default function SearchScreen({navigation}) {
  return (
    <View>
        <Button title="Press to view store" onPress={() => navigation.navigate("StoreScreen")}/>
    </View>
  );
}

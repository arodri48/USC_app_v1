import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from "USC_app_v1/Screens/WelcomeScreen";
import SearchScreen from "USC_app_v1/Screens/SearchScreen";
import StoreScreen from "USC_app_v1/Screens/StoreScreen";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function Root(){
    return(
        <RootStack.Navigator>
            <RootStack.Screen name="SearchScreen" component={SearchScreen} />
            <RootStack.Screen name="StoreScreen" component={StoreScreen}/>
        </RootStack.Navigator>
    );
}
export default function AppStack(){
    return(
        <NavigationContainer>
            <MainStack.Navigator>
                <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                <MainStack.Screen name="Root" component={Root} options={{headerShown: false}}/>
            </MainStack.Navigator>
        </NavigationContainer>
    );
}

import React, {useContext} from 'react';
import {AuthContext} from '../../Provider/AuthProvider';
import { Button, View } from 'react-native';

export default function WelcomeScreen({navigation}){
    const { dispatch } = useContext(AuthContext);
    return(
        <View>
            <Button title="Press to acknowledge" onPress={() => dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})}/>
        </View>
    )
}

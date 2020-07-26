import React, {useContext} from 'react';
import {AuthContext} from '../../Provider/AuthProvider';
import { Button, View, Button } from 'react-native';

export default function WelcomeScreen({navigation}){
    const { signIn } = useContext(AuthContext);
    return(
        <View>
            <Button title="Press to acknowledge" onPress={() => signIn}/>
        </View>
    )
}

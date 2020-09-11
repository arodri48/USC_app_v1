import React, {useContext} from 'react';
import {AuthContext} from '../../Provider/AuthProvider';
import {View, Text, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import ImageList from 'USC_app_v1/media/ImageStore';

export default function WelcomeScreen({navigation}) {
  const {dispatch} = useContext(AuthContext);
  return (
    <View style={styles.MainContainer}>
      <Text style={styles.sendASmile}>Send A Smile</Text>
      <Text style={styles.text}>A UniSelfCare Program</Text>
      <FastImage source={ImageList.Smile} />
      <Text style={styles.text}>
        Covid 19 has changed the way of{'\n'} life for many people. We have
        {'\n'}
        suffered as a result and are still on{'\n'} our way to normalcy. Let's
        help{'\n'}
        out our local businesses and take{'\n'} care of ourselves and loved
        ones.
      </Text>
      <Button
        title="Begin"
        onPress={() => dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'})}
        buttonStyle={styles.buttonStyle}
        titleStyle={styles.buttonText}
      />
      <View style={styles.bottomView}>
        <FastImage
          source={ImageList.Hands}
          style={{width: '100%', height: 150}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
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
  buttonStyle: {
    borderRadius: 40,
    backgroundColor: '#FCC6DF',
    padding: 10,
    paddingHorizontal: 60,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  bottomView: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

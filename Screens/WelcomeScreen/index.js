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
      <View style={{alignItems: 'center', justifyContent: 'center',  paddingTop: 100}}>
        <Text style={styles.sendASmile}>Send A Smile</Text>
        <Text style={styles.usc_text}>A UniSelfCare Program</Text>
          <View style={{width: '100%',
              height: 0,
              justifyContent: 'center',
              alignItems: 'center',
          }}>
              <FastImage
                  source={ImageList.Smile}
                  style={{alignSelf: 'center',
                      height: 400,
                      width: 800,
                      marginLeft: 30,
                      marginBottom: 0,

                  }}
                  resizeMode={FastImage.resizeMode.contain}
              />
          </View>
      </View>
        <View style={{alignItems: 'center', justifyContent: 'space-around',  width: '100%', height: 230}}>
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
        </View>

      <View style={styles.bottomView}>
        <FastImage
          source={ImageList.Hands_cropped}
          style={{width: '100%', height: 130, }}
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
    fontFamily: 'Raleway-SemiBold',
      paddingBottom: 0
  },
    usc_text: {
        color: '#535358',
        fontSize: 14,
        marginTop: -10
    },
  text: {
    color: '#535358',
    fontSize: 18,
    paddingTop: 10,
      textAlign: 'center'
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
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  bottomView: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',

  },
});

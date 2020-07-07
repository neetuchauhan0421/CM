/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert , StatusBar, BackHandler} from 'react-native';
import { Button, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { serverURI, serverURILOGIN } from '../global';

const instructions = Platform.select({
     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
     android:
          'Double tap R on your keyboard to reload,\n' +
          'Shake or press menu button for dev menu',
});

export default class Signin extends Component {
     constructor(props) {
          super(props);
          this.state = {
               username: '',
          }
     }
     componentWillMount() {
          BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
      }
      componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
      }
     
     resendClick = () => {
          // console.log("register is clicked")
          // if (this.state.signinSignup === '0') {
          //   Linking.openURL('http://35.236.8.175/#/register')
          //   this.setState({ signinSignup: '1' })
          // }

          const user = {
               superadminEmail: this.state.username,
          }
          axios
               .post(serverURILOGIN + "/forgotpasswordValidation", user)
               .then(response => {
                    if (response.data.status === true) {
                         Alert.alert(
                              "Email sent successfully!"
                         )
                         // { this.props.navigation.navigate('BottomNavigator',{userID:this.state.userID}) }
                    }
                    else if (response.data.errorType === 'email') {
                         Alert.alert(
                              title = response.data.errorMessage
                         )
                    }

                    else if (response.data.message) {
                         Alert.alert(
                              title = response.data.message
                         )
                    }
               })
     }
     render() {
          const theme = {
               ...DefaultTheme,
               colors: {
                    ...DefaultTheme.colors,
                    primary: '#E36E39',
                    accent: 'white',
               },
          }
          // -----------------  SIGN IN ----------------------
          return (
               <View style={styles.container0}>
                   {/* <StatusBar
                         barStyle="dark-content"
                         backgroundColor="#EFF1F5"
                    /> */}
                    <View style={styles.container1} >
                         {/* <Image source={require('../assets/schrocken-logo-large.png')} style={styles.logo} /> */}
                         <Text style={styles.welcome}>Resend email to verity your Account</Text>
                         <Text style={styles.instructions}>View your dashboard, connect with your contacts & schedule your meeting.</Text>

                         <TextInput
                      label='email'
                      keyboardType='email-address'
                              theme={theme}
                              value={this.state.username}
                              mode='outlined'
                              autoCapitalize='none'
                              onChangeText={(username) => this.setState({ username })}
                              style={styles.usernameInput} />

                         <Button mode="contained" onPress={() => this.resendClick()} style={styles.signinbutton}>Resend Verification Email </Button>

                         <Text
                              style={{
                                   // alignSelf: 'center',
                                   marginTop: 20
                              }}>New User?
                              
                              </Text>
                         <Button mode="outlined"
                              onPress={() => this.props.navigation.navigate("SignUp")}
                              color={'#3f51b5'}

                              style={{
                                   height: 50,
                                   width: 150,
                                   borderColor: '#3f51b5',
                                    justifyContent: 'center',
                                   //  alignSelf: 'center',
                                   marginTop: 10,
                                   elevation: 1
                              }}>
                              Get Started
                </Button>

                    </View>

                    <View style={{ position: "absolute", bottom: '2%', alignSelf: 'center' }}>
                         <Text style={{ textAlign: 'center' }} >Your details are secure with 256-bit encription {"\n"} enabled.
            <Text style={{ color: '#D52F6D' }}
                                   onPress={() => Linking.openURL('http://www.schrocken.com')}>
                                   Know More.
            </Text>
                         </Text>

                         <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
                              <Text style={{ fontSize: 13 }}>
                                   Powered by

                              </Text>
                              <Image source={require('../assets/schrocken-logo-large.png')}
                                   style={styles.logoSmall} />
                         </View>

                    </View>
               </View>
          );

     }
}

const styles = StyleSheet.create({
     container0: {
          flex: 1,
          // justifyContent: 'flex-start',
          backgroundColor: '#EFF1F5',
     },
     container1: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#EFF1F5',
     },
     container2: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#EFF1F5',
     },

     signinbutton: {
          backgroundColor: '#E36E39',
          width: 300,
          height: 50,
          justifyContent: 'center',
          alignSelf: 'center',
          marginTop: 30,
     },

     containerInputs: {
          marginTop: '10%',
     },
     welcome: {
          fontSize: 20,
          textAlign: 'center',
          marginTop: '10%',
     },
     instructions: {
          marginTop: '5%',
          textAlign: 'center',
          color: '#333333',
          fontSize: 13,
          marginLeft: 10,
     },
     logo: {
          width: 300,
          height: 80,
          alignItems: 'flex-start',
          marginTop: 50,
     },
     logoSmall: {
          width: 100,
          height: 20,
          marginTop: -5,
     },
     usernameInput: {
          fontSize: 35,
          marginTop: 25,
          width: '90%',
          backgroundColor: '#EFF1F5',
     },
     passwordInput: {
          fontSize: 25,
          marginTop: 10,
          width: '90%',
          backgroundColor: '#EFF1F5',
     }
});

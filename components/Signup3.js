/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
//import {SchrockenLogo} from './assets/schrocken_logo_large.png';
// import SchrockenLogoSmall from '../assets/schrocken_logo3x'
//import Lock from './assets/Lock';
import { Button, Provider, Dialog, Portal, Paragraph, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import { serverURI, serverURILOGIN } from '../global';

//import PasswordStrengthChecker from 'react-native-password-strength-checker';
const instructions = Platform.select({
     ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
     android:
          'Double tap R on your keyboard to reload,\n' +
          'Shake or press menu button for dev menu',
});

export default class Signup extends Component {
     constructor(props) {
          super(props);
          this.state = {
               username: '',
               password: '',
               checkboxChecked: true,
               visible: false,
          }
     }



     
     _hideDialog = () => this.setState({ visible: false });
     render() {
          const theme = {
               ...DefaultTheme,
               colors: {
                    ...DefaultTheme.colors,
                    primary: '#E36E39',
                    accent: 'white',
               },
          }

          const user = {
               superadminEmail: this.state.username,
               superadminPassword: this.state.password,
               emailPromotion: 0
          };

          registerClick = () => {
               if (this.state.username === '') {
                    Alert.alert(
                         title = 'Please Enter Username or email.',
                    )
               }
               else if (this.state.password === '') {
                    Alert.alert(
                         title = 'Please Enter Password.',
                    )
               }
               else {

                    axios
                         .post(serverURILOGIN+"/getSignUpDetailsForSuperAdmin", user)
                         .then(response => {
                              if (response.data.status === true) {
                                   Alert.alert(
                                        title = 'Email is sent in ' + this.state.username + ' for verification.',
                                   )

                              }
                              else if (response.data.errorType === 'email') {
                                   Alert.alert(
                                        title = 'Email field empty',
                                   )
                              }
                              else if (response.data.errorType === 'password') {
                                   Alert.alert(
                                        title = 'password error',
                                   )
                              }
                              else if (response.data.message) {
                                   Alert.alert(
                                        response.data.message,
                                   )
                                   this.props.navigation.navigate("SignIn")
                              }
                         })

               }
          }
          return (
               <View style={styles.container0}>
                    <View style={styles.container1}>
                         <Image source={require('../assets/schrocken-logo-large.png')} style={styles.logo} />
                         <Text style={styles.welcome}>Register your Account</Text>
                         <Text style={styles.instructions}>View your dashboard connect with your contacts & schedule your meeting.</Text>

                         <TextInput
                              label='username'
                              label='Username'
                              autoCapitalize='none'
                              theme={theme}
                              mode='outlined'
                              value={this.state.username}
                              onChangeText={(username) => this.setState({ username })}
                              style={styles.usernameInput} />

                         <TextInput
                              label='password'
                              label='Password'
                              secureTextEntry={true}
                              autocapitalize='none'
                              theme={theme}
                              mode='outlined'
                              value={this.state.password}
                              onChangeText={(password) => this.setState({ password })}
                              style={styles.passwordInput} />

                         <Button mode="contained" onPress={() => registerClick()} style={styles.signupbutton}>Sign Up
                         </Button>

                         <View style={{ marginTop: 10 }} >
                              <Text style={{ alignSelf: 'center' }}>Already a User?
                        <Text style={{ color: '#D52F6D' }}
                                        onPress={() => this.props.navigation.navigate('SignIn')}>Sign In.
                            </Text>
                              </Text>
                         </View>

                    </View>

                    <View style={{ position: "absolute", bottom: '1%', alignSelf: 'center' }}>
                         <Text style={{ textAlign: 'center' }} >Your details are secure with 256-bit encription {"\n"} enabled.
                        <Text style={{ color: '#D52F6D' }}
                                   onPress={() => Linking.openURL('http://www.schrocken.com')}>
                                   Know More.
                        </Text>
                         </Text>
                         <Text style={{ textAlign: 'center', fontSize: 13 }}>
                              Powered by
                    <Image source={require('../assets/schrocken-logo-large.png')} style={styles.logoSmall} />
                         </Text>
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
     dialogcontainer: {
          flex: 1,
     },
     signupbutton: {
          backgroundColor: '#E36E39',
          width: 170,
          height: 50,
          justifyContent: 'center',
          marginTop: 10,
     },

     container1: {
          flex: 1,
          alignItems: 'center',
          backgroundColor: '#EFF1F5',
     },
     containerInputs: {
          marginTop: '10%',

     },
     welcome: {
          fontSize: 25,
          textAlign: 'center',
          marginTop: '3%',
     },
     instructions: {
          marginTop: 20,
          width: '80%',
          textAlign: 'center',
          color: '#333333',
          fontSize: 13,
          marginLeft: 10,
     },
     logo: {
          width: '80%',
          height: 80,
          alignItems: 'flex-start',
          marginTop: '10%',
     },
     logoSmall: {
          width: 100,
          height: 20,
          marginTop: -5,
     },
     usernameInput: {
          fontSize: 35,
          marginTop: 20,
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

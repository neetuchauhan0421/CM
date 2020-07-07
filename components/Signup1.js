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
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Button, Provider, Dialog, Portal, Paragraph, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import { serverURI, serverURILOGIN } from '../global';

import PropTypes from 'prop-types';
import zxcvbn from 'zxcvbn';
import _ from 'lodash';
import PasswordStrength from './TinyComponents/PasswordStrengthChecker';
//import PasswordStrengthChecker from 'react-native-password-strength-checker';
const instructions = Platform.select({
   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
   android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
});

const { width: wWidth } = Dimensions.get('window');

const widthByPercent = (percentage, containerWidth = wWidth) => {
     const value = (percentage * containerWidth) / 100;
     return Math.round(value);
};

const regex = {
     digitsPattern: /\d/,
     lettersPattern: /[a-zA-Z]/,
     lowerCasePattern: /[a-z]/,
     upperCasePattern: /[A-Z]/,
     wordsPattern: /\w/,
     symbolsPattern: /\W/
};

export default class Signup extends Component {
   constructor(props) {
      super(props);
      this.animatedInnerBarWidth = new Animated.Value(0);
          this.animatedBarWidth = new Animated.Value(0);
      this.state = {
         username: '',
         password: '',
         //checkboxChecked: true,
         visible: false,
         passwordVisible: true,
         eyeVisible: 'visibility-off',
         password0: {
            value: '',
            isValid: false
         },
         level: -1,
         isTooShort: false
      }
   }

   _hideDialog = () => this.setState({ visible: false });
   _onChangePassword(password, isValid) {
      this.setState({ password0: { value: password, isValid: isValid } })
   }
   showPassword = () => {
      this.state.eyeVisible === 'visibility-off' ? this.setState({ eyeVisible: 'visibility' }) : this.setState({ eyeVisible: 'visibility-off' })
      this.state.passwordVisible ? this.setState({ passwordVisible: false }) : this.setState({ passwordVisible: true })
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

      // Define list of strength
      const strengthLevels = [
         {
            label: 'Weak',
            labelColor: '#000000',
            widthPercent: 15,
            innerBarColor: '#E33939'
         },
         {
            label: 'Weak',
            labelColor: '#000000',
            widthPercent: 25,
            innerBarColor: '#fe6c6c'
         },
         {
            label: 'Fair',
            labelColor: '#000000',
            widthPercent: 50,
            innerBarColor: '#F6931D'
         },
         {
            label: 'Good',
            labelColor: '#000000',
            widthPercent: 75,
            innerBarColor: '#89CE3A'
         },
         {
            label: 'Strong',
            labelColor: '#000000',
            widthPercent: 100,
            innerBarColor: '#89CE3A'
         }
      ];

      // Enable too short
      const tooShort = {
         enabled: true,
         label: 'Too short',
         labelColor: 'red'
      };


      const user = {
         superadminEmail: this.state.username,
         superadminPassword: this.state.password0.value,
         emailPromotion: 0
      };

      registerClick = () => {
         if (this.state.username === '') {
            Alert.alert(
               title = 'Please Enter Username or email.',
            )
         }
         else if (this.state.password0.value === '') {
            Alert.alert(
               title = 'Please Enter Password.',
            )
         }
         else {

            axios
               .post(serverURILOGIN + "/getSignUpDetailsForSuperAdmin", user)
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
               <Text style={styles.instructions}>View your dashboard, connect with your contacts & schedule your meeting.</Text>

               <TextInput
                  label='username'
                  label='Username'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  theme={theme}
                  mode='outlined'
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  style={styles.usernameInput} />

               {/* <TextInput
                              label='password'
                              label='Password'
                              secureTextEntry={true}
                              autocapitalize='none'
                              theme={theme}
                              mode='outlined'
                              value={this.state.password}
                              onChangeText={(password) => this.setState({ password })}
                              style={styles.passwordInput} /> */}
               <View>
                  <PasswordStrength
                     label='Password'
                     label='Password'
                     secureTextEntry={this.state.passwordVisible}
                     minLength={4}
                     ruleNames="symbols|words"
                     strengthLevels={strengthLevels}
                     tooShort={tooShort}
                     minLevel={0}
                     barWidthPercent={90}
                     showBarOnEmpty={true}
                     barColor="#EFF1F5"
                     style={styles.passwordInput}
                     onChangeText={(text, isValid) => this._onChangePassword(text, isValid)} />
                  <Icon
                     style={styles.eyeIcon}
                     name={this.state.eyeVisible}
                     size={25}
                     color="#000"
                     onPress={this.showPassword}
                  />
               </View>
               <Button mode="contained" onPress={() => registerClick()} style={styles.signupbutton}>Register
                         </Button>

               <Text
                  style={{ alignSelf: 'center', marginTop: '5%' }}>
                  Already a User?
                              </Text>

               <Button mode="outlined"
                  onPress={() => this.props.navigation.navigate('SignIn')} color={'#3f51b5'}

                  style={{
                     height: 50,
                     width: 150,
                     borderColor: '#3f51b5',
                     justifyContent: 'center',
                     alignSelf: 'center',
                     marginTop: 15,
                     elevation: 1

                  }}>
                  Sign In
                </Button>
            </View>

            <View style={{ position: "absolute", bottom: '1%', alignSelf: 'center' }}>
               <Text style={{ textAlign: 'center' }} >Your details are secure with 256-bit encription {"\n"} enabled.
                        <Text style={{ color: '#D52F6D' }}
                     onPress={() => Linking.openURL('http://www.schrocken.com')}>
                     {' '}Know More.
                        </Text>
               </Text>

               <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                  <Text style={{ fontSize: 13, marginTop:3  }}>
                     Powered by{' '}

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
   dialogcontainer: {
      flex: 1,
   },
   signupbutton: {
      backgroundColor: '#E36E39',
      width: 150,
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
      marginTop: 5,
   },
   instructions: {
      marginTop: 10,
      width: '80%',
      textAlign: 'center',
      color: '#333333',
      fontSize: 13,
      marginLeft: 10,
   },
   logo: {
    //  backgroundColor:'pink',
    width: 270,
    height: 75,
    alignItems: 'flex-start',
    marginTop: 30,
   },
   logoSmall: {
      width: 100,
      height: 20,
      
   },
   usernameInput: {
      fontSize: 35,
      marginTop: 15,
      width: '90%',
      backgroundColor: '#EFF1F5',
   },
   passwordInput: {
      fontSize: 25,
      marginTop: 10,
      width: '90%',
      backgroundColor: '#EFF1F5',
   },
   eyeIcon: {
      position: 'absolute',
      marginLeft: '80%',
      top: '35%'
   }

});

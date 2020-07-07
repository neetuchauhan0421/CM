/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, Alert, StatusBar, KeyboardAvoidingView, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Provider as PaperProvider, TextInput, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { userTypeAction } from '../actions/Actions';
import { serverURI, serverURILOGIN } from '../global';
import Spinner from 'react-native-loading-spinner-overlay';
import Checkbox from 'react-native-custom-checkbox';

const instructions = Platform.select({
   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
   android:
      'Double tap R on your keyboard to reload,\n' +
      'Shake or press menu button for dev menu',
});

class SignIn extends Component {

   state = {
      username: '',
      password: '',
      visible: false,
      checkboxChecked: false,
      isUserExistonHL: false,
      isUserSaaSVerified: false,
      tempfortesting: 318,
      passwordVisible: true,
      eyeVisible: 'visibility-off',
   }

   onSelectColor(userLogged) {
      this.props.userTypeAction({ userLogged });
      //this.props.navigation.goBack();
   }

   showPassword = () => {
      this.state.eyeVisible === 'visibility-off' ? this.setState({ eyeVisible: 'visibility' }) : this.setState({ eyeVisible: 'visibility-off' })
      this.state.passwordVisible ? this.setState({ passwordVisible: false }) : this.setState({ passwordVisible: true })
   }

   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => BackHandler.exitApp());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => BackHandler.exitApp());
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

      signInClick = () => {
         //Alert.alert('signin clicked1')
         this.onSelectColor(this.state.username);
         const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'BottomNavigator' })],
         });
         const resetAction2 = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'CreateProfile' })],
         });

         /**
          * email verify 
          * not exist in HL sameersitre@gmail.com
          * exist in HL sameer.sitre@schrocken.com
          */

         //  ************************  superadminSignin
         // this.setState({ spinner: true })
         if (this.state.username === '') {
            Alert.alert(
               title = 'Please enter Username or email.',
            )
         }
         else if (this.state.password === '') {
            Alert.alert(
               title = 'Please enter Password.',
            )
         }

         else {
            // this.setState({ spinner: true })
            const user = {
               superadminEmail: this.state.username,
               superadminPassword: this.state.password,
               rememberMe: 0
            }

            axios
               .post(serverURILOGIN + "/superadminSignin", user)
               .then(response => {
                  if (response.data.status === true) {
                     axios.get(serverURI + '/readMember/' + this.state.username)
                        .then(response2 => {
                           if (response2.data.membername) {
                              console.log('member exist')
                              //Alert.alert('readMember true')
                              this.setState({ isUserExistonHL: true });
                              this.setState({ spinner: false })
                              //this.props.navigation.navigate("BottomNavigator") 
                              this.props.navigation.dispatch(resetAction);
                           }
                           else if (response2.data.message === "memberId doesn't exist.") {
                              // Alert.alert('readMember false\n' + response2.data.message)
                              this.setState({ spinner: false })
                              this.setState({ isUserExistonHL: false });

                              //  this.props.navigation.navigate("EditProfileNewUser2", {newUser: this.state.isUserExistonHL})
                              this.props.navigation.dispatch(resetAction2);
                              console.log('no member details')
                           }

                        })
                        .catch(function (error) {
                           console.log('#######')
                           console.log(error);
                        });
                  }
                  else if (response.data.errorType === 'email') {
                     this.setState({ spinner: false })
                     Alert.alert(
                        title = response.data.errorMessage
                     )
                  }
                  else if (response.data.errorType === 'password') {
                     this.setState({ spinner: false })
                     Alert.alert(
                        // "Alert 3: "+
                        response.data.errorMessage
                     )
                  }
                  else if (response.data.message) {
                     this.setState({ spinner: false })
                     Alert.alert(
                        // "alert4: "+ 
                        response.data.message
                     )
                  }
                  else {
                     this.setState({ spinner: false })
                  }
               })
            //  this.setState({ spinner: false })
         }
         //  ************************  superadminSignin

         // ************************ readMember
         //axios.get(serverURI + '/readMember/' + this.state.tempfortesting)


         // ***************************  readMember
         console.log('Signed In.')
      }
      // -----------------  SIGN IN ----------------------
      return (

         <KeyboardAvoidingView style={styles.container0} behavior="padding" enabled>
            <StatusBar
               barStyle="dark-content"
               backgroundColor="#EFF1F5"
            />

            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.container1}>
               <Image source={require('../assets/schrocken-logo-large.png')} style={styles.logo} />
               <Text style={styles.welcome}>Sign in to your Account</Text>
               <Text style={styles.instructions}>View your dashboard, connect with your contacts & schedule your meeting.
                         </Text>

               <TextInput
                  label='username'
                  label='Username'
                  keyboardType='email-address'
                  theme={theme}
                  mode='outlined'
                  autoCapitalize='none'
                  value={this.state.username}
                  onChangeText={(username) => this.setState({ username })}
                  style={styles.usernameInput} />

               <View style={styles.passwordInput} >

                  <TextInput
                     label='password'
                     label='Password'
                     secureTextEntry={this.state.passwordVisible}
                     theme={theme}
                     mode='outlined'
                     autoCapitalize='none'
                     value={this.state.password}
                     onChangeText={(password) => this.setState({ password })}
                  // style={styles.passwordInput}
                  />
               </View>
               <Icon
                  style={styles.eyeIcon}
                  name={this.state.eyeVisible}
                  size={25}
                  color="#000"
                  onPress={this.showPassword}
               />

               <View style={{ flexDirection: 'row', marginTop: 7, width: '90%' }}>

                  <TouchableOpacity
                     style={{
                        flex: 1, flexDirection: 'row', marginLeft: -2,
                        //backgroundColor:'pink'
                     }}>

                     <Checkbox
                        style={{
                           backgroundColor: 'EFF1F5', color: '#E36E39', borderRadius: 4,
                           borderWidth: 2, borderColor: '#E36E39'
                        }}
                        status={this.state.checkboxChecked ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ checkboxChecked: !this.state.checkboxChecked }) }}
                     />
                     <Text style={{ alignSelf: 'center' }}>{'  '}Remember me </Text>
                  </TouchableOpacity>



                  {/* <View style={{ marginLeft: '26%' }} /> */}

                  <Text
                     style={{ alignSelf: 'center', color: '#E36E39' }}
                     onPress={() => this.props.navigation.navigate('EmailConfirmation')}>Forgot Password ?
                  </Text>

               </View>

               <Button
                  mode="contained"
                  onPress={() => signInClick()}
                  style={styles.signinbutton}>Sign In
               </Button>


               <Text
                  style={{
                     // alignSelf: 'center',
                     marginTop: 12
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
            <View style={{ position: "absolute", bottom: '1%', alignSelf: 'center' }}>
               <Text style={{ textAlign: 'center' }} >Your details are secure with 256-bit encription {"\n"} enabled.
                              <Text
                     style={{ color: '#D52F6D' }}
                     onPress={() => Linking.openURL('http://www.schrocken.com')}>
                     {' '}Know More.
                              </Text>
               </Text>

               <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                  <Text style={{ fontSize: 13, marginTop: 3 }}>
                     Powered by{' '}
                  </Text>
                  <Image source={require('../assets/schrocken-logo-large.png')}
                     style={styles.logoSmall} />
               </View>

            </View>
         </KeyboardAvoidingView>
      );
   }
}

const styles = StyleSheet.create({
   container0: {

      flexDirection: 'column',
      // justifyContent: 'flex-start',
      backgroundColor: '#EFF1F5',
      // position: 'relative',
      height: '100%',

   },
   spinnerTextStyle: {
      color: '#FFF',
      fontSize: 14,
   },
   container1: {
      alignItems: 'center',
      backgroundColor: '#EFF1F5',
   },

   signinbutton: {
      backgroundColor: '#E36E39',
      width: 150,
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 8,
   },

   getstartedbutton: {
      // backgroundColor: '#E36E39',
      width: 150,
      height: 50,
      color: '#039BE5',
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 15,
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
      marginTop: 9,
      alignSelf: 'center',
      textAlign: 'center',
      width: '80%',
      color: '#333333',
      fontSize: 13,
      bottom: 0,
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
      marginTop: 10,
      width: '90%',
      backgroundColor: '#EFF1F5',
   },
   passwordInput: {
      backgroundColor:'green',
      fontSize: 25,
      marginTop: 10,
      width: '90%',
      backgroundColor: '#EFF1F5',
   },
   eyeIcon: {
     // backgroundColor: 'pink',
      position: 'absolute',
      top: "57%",
      right: "9%"
   }

});



const mapStateToProps = state => ({});

export default connect(mapStateToProps, { userTypeAction })(SignIn);

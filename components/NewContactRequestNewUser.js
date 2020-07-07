import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Alert, ToastAndroid, BackHandler } from 'react-native'
import { TextInput, theme, DefaultTheme, Button } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import axios from 'axios';
import { serverURI } from '../global';
import { userIDLoggedin } from '../global';
import { connect } from 'react-redux';

class NewContactRequest extends Component {
   constructor() {
      super();
      this.state = {
         memberInput: '',
         spinner: false,
      }
   }

   handleBackButton = () => {

      Alert.alert(
         'Exit App',
         'Do you want to Exit?', [{
            text: 'Cancel',
            style: 'cancel'
         }, {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
         },], {
            cancelable: false
         }
      )
      return true;
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
   }
   componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

   }
   render() {
      const theme = {
         ...DefaultTheme,
         colors: {
            ...DefaultTheme.colors,
            primary: '#E36E39',
            accent: 'EFF1F5',
         },
      }


      newContactClick = () => {

         if (this.state.memberInput === '') {
            Alert.alert(
               title = 'Please enter Member Email.',
            )
         }
         else if (this.state.memberInput === this.props.userLogged) {
            Alert.alert('Please enter valid Member email.')
         }
         else {

            axios.get(serverURI + '/readMember/' + this.state.memberInput)
               .then(response => {
                  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')

                  if (response.data.membername) {

                     // ***********  addNewMember


                     var details = {
                        memberId: this.state.memberInput,
                     };
                     var formBody = [];
                     for (var property in details) {
                        var encodedKey = encodeURIComponent(property);
                        var encodedValue = encodeURIComponent(details[property]);
                        formBody.push(encodedKey + "=" + encodedValue);
                     }
                     formBody = formBody.join("&");
                     console.log('Before response @' + formBody)

                     fetch(serverURI + '/addNewMember/' + this.props.userLogged, {
                        method: 'POST',
                        headers: {
                           'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: formBody
                     })
                        .then(function (response) {
                           if (JSON.parse(response._bodyInit).Message) {

                              // this.props.navigation.navigate('BottomNavigator')
                              Alert.alert(JSON.parse(response._bodyInit).Message);
                           }
                           else {

                              this.props.navigation.navigate('BottomNavigator')
                              Alert.alert('Contact request is sent.')
                           }


                           console.log("resp:", JSON.parse(response._bodyInit).Message);

                        }).catch(function (error) {
                           console.log("error:", error); //TypeError: Failed to fetch
                           alert(errorOTP);
                        });

                     this.props.navigation.navigate('BottomNavigator')
                  }
                  else if (response.data.message === "memberId doesn't exist.") {
                     //this.setState({ spinner: !this.state.spinner })
                     Alert.alert('MemberID does not exist.')
                     console.log('no member details')
                  }
               })
               .catch(function (error) {
                  console.log('#######')
                  console.log(error);
               })


         }
      }


      return (

         <View style={styles.container0}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            <Text style={styles.text0}>New Contact</Text>
            <Text style={styles.text1}>
               Enter the Member Identifier and request for an access to their details.
                </Text>
            <TextInput
               label='Member Email'
               label='Member  Email'
               autoCapitalize='none'
               mode='outlined'
               theme={theme}
               keyboardType='email-address'
               value={this.state.memberInput}
               onChangeText={(memberInput) => this.setState({ memberInput })}
               style={styles.input} />

            <Button mode="contained" onPress={() => newContactClick()} style={styles.signinbutton}>
               REQUEST ACCESS
                </Button>


            <Button mode="outlined"
               onPress={() => this.props.navigation.navigate("BottomNavigator")}
               color={'#3f51b5'}

               style={{
                  height: 50,
                  borderColor: '#3f51b5',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 25,
                  elevation: 1,
               }}>
               Go to Dashboard
                </Button>
         </View>
      );
   }
}

styles = StyleSheet.create({
   container0: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      // justifyContent: 'flex-start',
      backgroundColor: '#EFF1F5',
   },
   text0: {
      marginTop: '10%',
      fontSize: 21,
   },
   text1: {
      textAlign: 'center',
      width: '90%',
      marginTop: '5%',
   },
   input: {
      fontSize: 35,
      marginTop: 15,
      width: '90%',
      backgroundColor: '#EFF1F5',
      marginBottom: '8%',
   },
   signinbutton: {
      backgroundColor: '#E36E39',
      width: 180,
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 15,
      elevation: 3,
   },
}
);

const mapStateToProps = state => {
   return { userLogged: state.userLogged, isNewUser: state.isNewUser };
};

export default connect(mapStateToProps)(NewContactRequest);

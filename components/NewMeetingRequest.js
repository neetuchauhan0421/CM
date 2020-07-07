import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, TextInput, View, Alert, TouchableOpacity, BackHandler } from 'react-native';
import { Button, Card, Provider as PaperProvider, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import { serverURI } from '../global';
import { connect } from 'react-redux';

import DateTimePicker from 'react-native-modal-datetime-picker';
class NewMeetingRequest extends Component {
   constructor() {
      super();
      this.state = {
         isDateTimePickerVisible: false,
         selectedDate: "",
         datetimeSwitch: "",
         memberId: "",
         dateInput: "",
         newTimeDateInput: "",
         timeInput: "",
         discussion: null,
         latitude: null,
         longitude: null,
         error: null,
      }
   }

   _showDatePicker = () => {
      this.setState({ datetimeSwitch: "date" })
      this.setState({ isDateTimePickerVisible: true })
   };
   _showTimePicker = () => {
      this.setState({ datetimeSwitch: "time" })
      this.setState({ isDateTimePickerVisible: true })
   };
   _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
   _handleDatePicked = date => {
      let dateorTimeValue = date.toString()
      //Tue Jan 01 2019 14:55:58 GMT+0530 (IST)
      if (this.state.datetimeSwitch === 'date') {
         //dateorTimeValue.slice(0,15)
         this.setState({ dateInput: dateorTimeValue.slice(0, 15) });
         this.setState({ newTimeDateInput: this.state.dateInput })
         this.setState({ timeInput: '' });
      }
      if (this.state.datetimeSwitch === 'time') {
         this.setState({ timeInput: dateorTimeValue.slice(15, 40) });
         this.setState({ dateInput: this.state.newTimeDateInput })
         //this.setState({ timeInput: dateorTimeValue });
         this.setState({ dateInput: this.state.dateInput.concat(this.state.timeInput) })
      }
      this._hideDateTimePicker();
   };
   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentDidMount() {
      navigator.geolocation.getCurrentPosition(
         (position) => {
            this.setState({
               latitude: position.coords.latitude,
               longitude: position.coords.longitude,
               //pos:position,
               error: null,
               discussion: 'latitude: ' + position.coords.latitude.toString() +
                  ' longitude:' + position.coords.longitude.toString(),
               //discussion: JSON.stringify(position)
            });
         },
         (error) => this.setState({ error: error.message }),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
   }

   findCoordinates = () => {

   };
   render() {
      const theme = {
         ...DefaultTheme,
         colors: {
            ...DefaultTheme.colors,
            primary: '#E36E39',
            accent: 'white',
         },
      }
      const { navigation } = this.props;
      var userID = navigation.getParam('userID', 'NO_userID')
      var memId = navigation.getParam('memberId', 'NO-ID');
      const contactId = navigation.getParam('contactId', 'NO-ID');
      const memberName = navigation.getParam('memberName', 'NO-ID');
      const memberLocation = navigation.getParam('memberLocation', 'NO-ID');
      const membershipDate = navigation.getParam('membershipDate');
      const memberAbout = navigation.getParam('memberAbout', 'NO-ID');
      const { isDateTimePickerVisible } = this.state;
      const meetingRequest = {
         memberId: memId,
         meetingDate: this.state.dateInput,
         meetingTime: this.state.timeInput,
         meetingReason: this.state.discussion,
      }

      newMeetingClick = () => {
         if (this.state.dateInput === '') {
            Alert.alert(
               title = 'Please enter Date.',
            )
         }
         else if (this.state.timeInput === '') {
            Alert.alert(
               title = 'Please enter Time.',
            )
         }
         else if (this.state.discussion === '') {
            Alert.alert(
               title = 'Please enter reason of the meeting..',
            )
         }
         else {
            var details = {
               memberId: memId,
               meetingDate: this.state.dateInput,
               meetingTime: this.state.timeInput,
               meetingReason: this.state.discussion.toString(),
            };
            var formBody = [];
            for (var property in details) {
               var encodedKey = encodeURIComponent(property);
               var encodedValue = encodeURIComponent(details[property]);
               formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log('Before response @' + formBody)
            fetch(serverURI + '/addNewMeeting/' + this.props.userLogged, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               body: formBody
            })
               .then(response => {
                  response.json()
                  console.log('response @:' + JSON.stringify(response))
                  this.setState({ spinner: !this.state.spinner })
               });

            Alert.alert(
               'Request is Sent.',
               'Sent Meeting Request to \n' + memberName,
               [
                  {
                     text: 'OK',
                     onPress: () => this.props.navigation.navigate('BottomNavigator')
                  }
               ],
               {
                  cancelable: false
               }
            )
         }
      }

      return (

         <View style={styles.container0}>
            <DateTimePicker
               isVisible={isDateTimePickerVisible}
               onConfirm={this._handleDatePicked}
               onCancel={this._hideDateTimePicker}
               mode={this.state.datetimeSwitch}
               is24Hour={false}
            />

            <Card style={styles.card0} >
               <Text>
                  Schedule Meeting With:{'\n'}
               </Text>
               <View style={{ flex: 0, flexDirection: 'row' }}>

                  <View
                     style={{
                        width: 70,
                        justifyContent: 'flex-start', alignItems: 'flex-start',
                        marginRight: 15,
                        //backgroundColor: 'orange'
                     }}>
                     <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                  </View>

                  <View>
                     {/* {'\nuserID:   '}{userID}
                        {'\nMemberId:   '}{memId} */}
                     {/* {contactId}{'\n'} */}

                     <Text style={{ fontSize: 17 }}>{memberName}</Text>
                     <Text style={{ fontSize: 13, marginTop: 3 }}>{memberAbout}</Text>

                     <Text style={{ color: '#757575', fontSize: 12, marginTop: 3 }}>{memberLocation}</Text>
                     <Text style={{ color: '#757575', fontSize: 12, marginTop: 3 }}>{'Member Since '}{membershipDate}</Text>
                  </View>

               </View>
            </Card>

            {/* ******* DATE    ****** */}
            <View style={{ flexDirection: 'row' }}>
               <View style={styles.dateContainer} >

                  <TextInput
                     style={styles.inputStyle}
                     placeholder="DD/MM/YYYY"
                     value={this.state.dateInput.slice(0, 16)}
                     editable={false}
                     //selectTextOnFocus={false}
                     onChangeText={(dateInput) => this.setState({ dateInput })}
                  />
                  <View style={{ marginTop: 10, marginRight: 15 }} >
                     <Icon
                        name='md-calendar'
                        color='#000'
                        size={30}
                        onPress={this._showDatePicker}
                     />
                  </View>
               </View>

               {/* *******    TIME    ****** */}
               <View style={styles.timeContainer} >
                  <TextInput
                     style={styles.inputStyle}
                     placeholder="TIME"
                     editable={false}
                     // selectTextOnFocus={false}
                     value={this.state.timeInput.slice(1, 6)}
                     onChangeText={(timeInput) => this.setState({ timeInput })}
                  />
                  <View style={{ marginTop: 10, marginRight: 15 }} >
                     <Icon
                        name='md-alarm'
                        color='#000'
                        size={30}
                        onPress={this._showTimePicker}
                     />
                  </View>
               </View>
            </View>

            <TextInput
               style={styles.discussionInput}
               placeholder="Reason for meeting request."
               blurOnSubmit
               multiline={true}
               textAlignVertical={'top'}
               numberOfLines={2}
               value={this.state.discussion}
               onChangeText={(discussion) => this.setState({ discussion })}
            />
            {/* <Text>{'lat"'+this.state.latitude}</Text> */}

            <Button mode="contained" onPress={() => newMeetingClick()} style={styles.requestButton}>
               send Meeting REQUEST
                </Button>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container0: {
      height: '100%',
      // justifyContent: 'flex-start',
      backgroundColor: '#EFF1F5',
   },
   card0: {
      flex: 0,
      padding: 10,
      //paddingLeft: 5,
      width: '95%',
      height: 135,
      elevation: 2,
      marginTop: 10,
      alignSelf: 'center',
   },
   dateInput: {
      width: '30%',
      height: 50,
      marginLeft: '5%',

      backgroundColor: 'white',
      // marginTop: '15%',
      // marginLeft: '5%',
      elevation: 6,
   },
   timeInput: {
      width: '30%',
      height: 50,
      backgroundColor: 'white',
      marginLeft: '5%',
      elevation: 6,
   },
   discussionInput: {
      width: '90%',
      height: 80,
      fontSize: 16,
      backgroundColor: 'white',
      marginTop: '5%',
      marginLeft: '5%',
      padding: '2%',

   },
   requestButton: {
      backgroundColor: '#E36E39',
      width: '90%',
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 15,
      elevation: 2,
   },
   dateContainer: {
      marginLeft: '5%',
      backgroundColor: 'white',
      marginTop: 20,
      flexDirection: 'row',
      height: 50,
      width: '50%',
   },
   timeContainer: {
      marginLeft: '4%',
      backgroundColor: 'white',
      marginTop: 20,
      flexDirection: 'row',
      height: 50,
      width: '36%',
   },
   inputStyle: {
      flex: 1,
      marginLeft: 15,
      fontSize: 16,
      backgroundColor: '#FFFFFF'
   },
});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(NewMeetingRequest);


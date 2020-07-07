import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, ScrollView, RefreshControl, BackHandler } from 'react-native';
import { Appbar, Card, Switch, Button, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { serverURI } from '../global';
import { userIDLoggedin } from '../global';
export default class ShareDetails extends Component {
   constructor(props) {
      super(props)
      this.state = {
         profileData: [],
         userID: userIDLoggedin,
         s_MemDateFlag: false,
         s_Location: false,
         s_Phone: false,
         s_Email: false,
         s_Social: false,
         s_setMeetings: false,
         spinner: false,
         refreshing: false,
         taskId: '',
      }
   }


   getUserDetails() {
      //this.setState({ spinner: !this.state.spinner })
      this.setState({ spinner: true })
      axios
         .post(serverURI + '/memberRequest/' + this.props.navigation.getParam('userID', 'NO_userID'))
         .then(response => {
            this.setState({ profileData: response.data })

            // ---- MEMDATE
            if (response.data.defaultMemDateFlag === 'y') {
               this.setState({ s_MemDateFlag: true })
            }
            if (response.data.defaultMemDateFlag === 'n') {
               this.setState({ s_MemDateFlag: false })
            }

            // ---- LOCATION
            if (response.data.defaultLocationFlag === 'y') {
               this.setState({ s_Location: true })
            }
            if (response.data.defaultLocationFlag === 'n') {
               this.setState({ s_Location: false })
            }

            // ---- PHONE
            if (response.data.defaultPhoneFlag === 'y') {
               this.setState({ s_Phone: true })
            }
            if (response.data.defaultPhoneFlag === 'n') {
               this.setState({ s_Phone: false })
            }

            // ---- EMAIL
            if (response.data.defaultEmailFlag === 'y') {
               this.setState({ s_Email: true })
            }
            if (response.data.defaultEmailFlag === 'n') {
               this.setState({ s_Email: false })
            }

            // ---- SOCIAL
            if (response.data.defaultSocialFlag === 'y') {
               this.setState({ s_Social: true })
            }
            if (response.data.defaultSocialFlag === 'n') {
               this.setState({ s_Social: false })
            }

            // ---- MEETINGS
            if (response.data.setMeetings === 'y') {
               this.setState({ s_setMeetings: true })
            }
            if (response.data.setMeetings === 'n') {
               this.setState({ s_setMeetings: false })
            }
            // this.setState({ spinner: !this.state.spinner })
            this.setState({ spinner: false })
         })
   }

   componentDidMount() {
      this.getUserDetails();
   }
   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   // shareSwitchClick = () => {
   //      this.setState({ spinner: !this.state.spinner })
   //      var details = {
   //           "sharingdefaultmemdate": this.state.s_MemDateFlag ? "y" : "n",
   //           "sharingdefaultemail": (this.state.s_Email ? "y" : "n"),
   //           "sharingdefaultphone": this.state.s_Phone ? "y" : "n",
   //           "sharingdefaultsocialacc": this.state.s_Social ? "y" : "n",
   //           "sharingdefaultlocation": this.state.s_Location ? "y" : "n",
   //           "sharingdefaultsetmeetings": this.state.s_setMeetings ? "y" : "n",
   //      };

   //      var formBody = [];
   //      for (var property in details) {
   //           var encodedKey = encodeURIComponent(property);
   //           var encodedValue = encodeURIComponent(details[property]);
   //           formBody.push(encodedKey + "=" + encodedValue);
   //      }
   //      formBody = formBody.join("&");
   //      console.log('Before response @' + formBody)
   //      fetch(serverURI + '/editDefaultSharingRule/2', {
   //           method: 'POST',
   //           headers: {
   //                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
   //           },
   //           body: formBody
   //      })
   //           .then(response => {
   //                response.json()
   //                console.log('response @:' + JSON.stringify(response))
   //                this.setState({ spinner: !this.state.spinner })
   //           });
   // }

   shareButtonClick = () => {

      //  this.setState({ spinner: !this.state.spinner })
      console.log('email:' +
         this.state.s_Email + '\nlocation:' + this.state.s_Location + '\ndate:' + this.state.s_MemDateFlag + '\nphone:' + this.state.s_Phone + '\nsocial:' + this.state.s_Social + '\nsetmeeting:' + this.state.s_setMeetings
      )

      var details = {
         "sharingdefaultmemdate": this.state.s_MemDateFlag ? "y" : "n",
         "memberEmail1": (this.state.s_Email ? "y" : "n"),
         "memberContactNum1": this.state.s_Phone ? "y" : "n",
         "memberSocialAcc1": this.state.s_Social ? "y" : "n",
         "memberLoc": this.state.s_Location ? "y" : "n",
         "setMeetings1": this.state.s_setMeetings ? "y" : "n",
         "aboutMember1": this.state.s_setMeetings ? "y" : "n",

      };

      var formBody = [];
      for (var property in details) {
         var encodedKey = encodeURIComponent(property);
         var encodedValue = encodeURIComponent(details[property]);
         formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log('Before response @' + formBody)


      fetch(serverURI + '/setShareDetails/' + this.props.navigation.getParam('taskID', 'NO_userID'), {
         method: 'POST',
         headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
         },
         body: formBody
      })
         .then(response => {
            response.json()
            this.props.navigation.state.params.onNavigateBack()
            this.props.navigation.goBack()
         });


   }


   _onRefresh = () => {
      this.getUserDetails();
   }

   render() {

      const taskID = this.props.navigation.getParam('taskID', 'NO_userID')
      return (
         <View style={{ flex: 1, backgroundColor: '#F2F4F8', height: '100%' }}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            <ScrollView contentContainerStyle={{
               flexGrow: 1,

            }}
               refreshControl={
                  <RefreshControl
                     refreshing={this.state.refreshing}
                     onRefresh={this._onRefresh}
                  />
               }
            >
               <View style={styles.container0}>
                  {/* ---------------     PROFILE     --------------- */}
                  <Card style={styles.profileA}>
                     <Text style={{ fontSize: 16 }}>{this.state.profileData.memberName}</Text>
                     <Text style={{ width: '90%' }}>{this.state.profileData.memberShortBio}{this.props.navigation.getParam('taskID', 'NO_userID')}</Text>
                     <View style={styles.shares}>
                        <Text>{this.state.profileData.membershipDate}</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_MemDateFlag: value })}
                           value={this.state.s_MemDateFlag}


                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                        />
                     </View>
                  </Card>

                  {/* ---------------     ABOUT     --------------- */}
                  <Card style={styles.profileB}>
                     <Text style={{ fontSize: 16 }}>About</Text>
                     <Text>{this.state.profileData.aboutMember}</Text>
                  </Card>

                  {/* ---------------     DEFAULT SHARE DETAILS     --------------- */}
                  <Card style={styles.profileC}>
                     <View style={styles.shares}>
                        <Icon2 name="home" color="#8320F4" size={20} />
                        <Text style={styles.shareText}>{this.state.profileData.memberLoc}</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_Location: value })}
                           value={this.state.s_Location}

                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                     </View>

                     <View style={styles.shares}>
                        <Icon2 name="phone" color="#8320F4" size={20} />
                        <Text style={styles.shareText}>{this.state.profileData.memberContactNum}</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_Phone: value })}
                           value={this.state.s_Phone}

                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                     </View>

                     <View style={styles.shares}>
                        <Icon name="md-mail" color="#8320F4" size={20} />
                        <Text style={styles.shareText}>{this.state.profileData.memberEmail}</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_Email: value })}
                           value={this.state.s_Email}

                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                     </View>
                     <View style={styles.shares}>
                        <Icon2 name="hashtag" color="#8320F4" size={20} />
                        <Text style={styles.shareText}>{this.state.profileData.memberSocialAcc}</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_Social: value })}
                           value={this.state.s_Social}

                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                     </View>
                  </Card>

                  {/* ---------------     SETUP MEETING     --------------- */}
                  <Card style={styles.profileD}>
                     <View style={styles.shares}>
                        <Text style={styles.shareText}>Setup Meetings with you.</Text>
                        <Switch
                           color={'#89CE3A'}
                           onValueChange={(value) => this.setState({ s_setMeetings: value })}
                           value={this.state.s_setMeetings}

                           style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                     </View>
                  </Card>

               </View>
            </ScrollView>
            <Button mode="contained" onPress={() => this.shareButtonClick()} style={styles.sharebutton}>
               Share your Details
                </Button>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container0: {
      flex: 1,
      alignItems: 'center',
   },

   spinnerTextStyle: {
      color: '#FFF',
      fontSize: 14,
   },

   shareText: {
      margin: 5,
   },

   profileA: {
      padding: 10,
      marginTop: '2.5%',
      paddingBottom: 20,
      width: '95%',
      flex: 0,
      elevation: 3,
   },

   profileB: {
      padding: '3%',
      marginTop: '2.5%',
      width: '95%',
      flex: 0,
      elevation: 3,
   },

   profileC: {
      padding: '3%',
      marginTop: '2.5%',
      width: '95%',
      flex: 0,
      elevation: 3,
   },

   shares: {
      flexDirection: 'row',
      flex: 0,
      marginTop: '3%',
   },

   profileD: {
      padding: '2%',
      paddingBottom: '4%',
      marginTop: '2.5%',
      width: '95%',
      flex: 0,
      elevation: 3,
      alignSelf: 'center',
   },
   sharebutton: {
      backgroundColor: '#89CE3A',
      width: '95%',
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',
      marginTop: 5,
      marginBottom: 10,
      elevation: 2,
   }

});


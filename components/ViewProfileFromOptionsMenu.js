import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, TouchableOpacity, RefreshControl, Switch } from 'react-native';
import { Appbar, Card, Button, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { serverURI } from '../global.js';
import { userIDLoggedin } from '../global';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { withNavigation, NavigationActions } from 'react-navigation';
class ViewProfile extends Component {
     constructor() {
          super()
          this.state = {
               visible: false,
               profileData: [],
               defaultShareData: [],
               s_MemDateFlag: false,
               s_Location: false,
               s_Phone: false,
               s_Email: false,
               s_Social: false,
               s_setMeetings: false,
               spinner: false,
               refreshing: false,
          }
     }

     getUserDetails() {
          this.setState({ spinner: true })
          // this.setState({ refreshing: !this.state.refreshing })
          axios.post(serverURI + '/memberRequest/' + this.props.userLogged)
               .then(response => {
                    this.setState({ profileData: response.data })

                    // ---- MEMDATE
                    if (response.data.defaultMemDateFlag === 'y') {
                         this.setState({ s_MemDateFlag: true })
                    }
                    else if (response.data.defaultMemDateFlag === 'n') {
                         this.setState({ s_MemDateFlag: false })
                    }

                    // ---- LOCATION
                    if (response.data.defaultLocationFlag === 'y') {
                         this.setState({ s_Location: true })
                    }
                    else if (response.data.defaultLocationFlag === 'n') {
                         this.setState({ s_Location: false })
                    }

                    // ---- PHONE
                    if (response.data.defaultPhoneFlag === 'y') {
                         this.setState({ s_Phone: true })
                    }
                    else if (response.data.defaultPhoneFlag === 'n') {
                         this.setState({ s_Phone: false })
                    }

                    // ---- EMAIL
                    if (response.data.defaultEmailFlag === 'y') {
                         this.setState({ s_Email: true })
                    }
                    else if (response.data.defaultEmailFlag === 'n') {
                         this.setState({ s_Email: false })
                    }

                    // ---- SOCIAL
                    if (response.data.defaultSocialFlag === 'y') {
                         this.setState({ s_Social: true })
                    }
                    else if (response.data.defaultSocialFlag === 'n') {
                         this.setState({ s_Social: false })
                    }


                    // ---- MEETINGS
                    if (response.data.setMeetings === 'y') {
                         this.setState({ s_setMeetings: true })
                    }
                    else if (response.data.setMeetings === 'n') {
                         this.setState({ s_setMeetings: false })
                    }
                    this.setState({ spinner: false })
                    //     this.setState({ spinner: !this.state.spinner })
                    //   this.setState({ refreshing: !this.state.refreshing })
               })

     }

     componentDidMount() {
          this.getUserDetails();
     }

     saveProfileClick = () => {
          //this.setState({ refreshing:true })
          this.setState({ spinner: true })
          console.log('email:' +
               this.state.s_Email + '\nlocation:' + this.state.s_Location + '\ndate:' + this.state.s_MemDateFlag + '\nphone:' + this.state.s_Phone + '\nsocial:' + this.state.s_Social + '\nsetmeeting:' + this.state.s_setMeetings
          )

          var details = {
               sharingdefaultmemdate: this.state.s_MemDateFlag === false ? "n" : "y",
               sharingdefaultemail: this.state.s_Email === false ? "n" : "y",
               sharingdefaultphone: this.state.s_Phone === false ? "n" : "y",
               sharingdefaultsocialacc: this.state.s_Social === false ? "n" : "y",
               sharingdefaultlocation: this.state.s_Location === false ? "n" : "y",
               sharingdefaultsetmeetings: this.state.s_setMeetings === false ? "n" : "y",
          };
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
          console.log(details)
          var formBody = [];
          for (var property in details) {
               var encodedKey = encodeURIComponent(property);
               var encodedValue = encodeURIComponent(details[property]);
               formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          console.log('Before response @' + formBody)
          fetch(serverURI + '/editDefaultSharingRule/' + this.props.userLogged, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               body: formBody
          })
               .then(response => {
                    response.json()
                    console.log('response @:' + JSON.stringify(response))
                    this.setState({ spinner: false })
                    // this.setState({ spinner: !this.state.spinner })
               });
               
          // this.ShowAlertWithDelay()
          // this.setState({ refreshing:false })
          //    setTimeout(this.getUserDetails, 2000);
     }

     // ShowAlertWithDelay = () => {
     //      setTimeout(function () {
     //           this.componentDidMount
     //           //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
     //           //  Alert.alert("Alert Shows After 5 Seconds of Delay.")
     //      }, 2000);
     // }
     _onRefresh = () => {
          this.getUserDetails();
     }

     render() {
          return (
               <View style={{ flex: 1, backgroundColor: '#EFF1F5' }}>
                    <Spinner
                         visible={this.state.spinner}
                         textContent={'Loading...'}
                         textStyle={styles.spinnerTextStyle}
                    />
                    
                    {/* ?--------------     APPBAR      ---------------- */}
                   

                    <ScrollView
                         contentContainerStyle={{ flexGrow: 1, }}
                         refreshControl={
                              <RefreshControl
                                   refreshing={this.state.refreshing}
                                   onRefresh={this._onRefresh}
                              />
                         }>

                         <View style={styles.container0}>
                              {/* ---------------     PROFILE     --------------- */}
                              <Card style={styles.profileA}>
                                   <Text style={{ fontSize: 16 }}>{this.state.profileData.memberName}</Text>
                                   <Text style={{ width: '95%' }}>{this.state.profileData.memberShortBio}</Text>

                                   <View style={styles.shares}>
                                        <Text>{this.state.profileData.membershipDate}</Text>

                                        <Switch
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

                                             onValueChange={(value) => this.setState({ s_Location: value })}
                                             value={this.state.s_Location}
                                             style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                                   </View>


                                   <View style={styles.shares}>
                                        <Icon2 name="phone" color="#8320F4" size={20} />
                                        <Text style={styles.shareText}>{this.state.profileData.memberContactNum}</Text>
                                        <Switch

                                             onValueChange={(value) => this.setState({ s_Phone: value })}
                                             value={this.state.s_Phone}
                                             style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                                   </View>

                                   {/* **************      EMAIL   ***************** */}
                                   <View style={styles.shares}>
                                        <Icon name="md-mail" color="#8320F4" size={20} />
                                        <Text style={styles.shareText}>{this.state.profileData.memberEmail}</Text>
                                        <Switch

                                             onValueChange={(value) => this.setState({ s_Email: value })}
                                             value={this.state.s_Email}
                                             style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                                   </View>


                                   <View style={styles.shares}>
                                        <Icon2 name="hashtag" color="#8320F4" size={20} />
                                        <Text style={styles.shareText}>{this.state.profileData.memberSocialAcc}</Text>
                                        <Switch

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

                                             onValueChange={(value) => this.setState({ s_setMeetings: value })}
                                             value={this.state.s_setMeetings}
                                             style={{ position: 'absolute', right: '2%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                                   </View>
                              </Card>


                              <Button
                                   mode="contained"
                                   onPress={() => this.saveProfileClick()}
                                   style={styles.savebutton}> Save
                    </Button>
                         </View>
                    </ScrollView>

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
     savebutton: {
          backgroundColor: '#89CE3A',
          width: '95%',
          height: 50,
         alignSelf:'center',
          justifyContent: 'center',
          elevation: 2,
          marginTop: 10,
          marginBottom: 10,

     },
});

const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};
export default withNavigation(connect(mapStateToProps)(ViewProfile))
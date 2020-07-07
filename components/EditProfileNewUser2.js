import React, { Component } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, ScrollView, } from 'react-native';
import { Appbar, Card, Switch, Button, TextInput, Provider as PaperProvider, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
import InputScrollView from 'react-native-input-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import { serverURI } from '../global';
import { connect } from 'react-redux';
class EditProfileNewUser2 extends Component {
     constructor(props) {
          super(props);
          this.state = {
               text: '',
               textareaHeight: null,
               createdby: "admin",
               creationdate: "01/01/2019",
               docType: "MemberInfo",
               imageurl: "imgur.com",
               isdeleted: "n",
               lastupdatedate: "10/01/2019",
               lastupdatedby: "admin",
               memberabout: "",
               memberemail: "",
               memberid: "",
               memberlocation: "",
               membername: "",
               memberphonenumber: "",
               membershipdate: "01/01/2019",
               membershortbio: "",
               membersocialaccount: "#",
               sharingdefaultemail: "n",
               sharingdefaultlocation: "n",
               sharingdefaultmemdate: "n",
               sharingdefaultphone: "n",
               sharingdefaultsetmeetings: "n",
               sharingdefaultsocialacc: "n"
          }
     }
     componentDidMount() {
          this.setState({ spinner: !this.state.spinner })
          axios(serverURI + "/readMember/" + this.props.userLogged)
               .then(response => {
                    //const persons = res.data;
                    //Alert.alert(response.data.membername)
                    this.setState({

                         membername: response.data.membername,
                         membershortbio: response.data.membershortbio,
                         memberabout: response.data.memberabout,
                         creationdate: response.data.creationdate,
                         memberlocation: response.data.memberlocation,
                         memberphonenumber: response.data.memberphonenumber,
                         memberemail: response.data.memberemail,
                         membersocialaccount: response.data.membersocialaccount,

                         // sharingdefaultemail: response.data.sharingdefaultemail,
                         // sharingdefaultlocation: response.data.sharingdefaultlocation,
                         // sharingdefaultmemdate: response.data.sharingdefaultmemdate,
                         // sharingdefaultphone: response.data.sharingdefaultphone,
                         // sharingdefaultsetmeetings: response.data.sharingdefaultsetmeetings,
                         // sharingdefaultsocialacc: response.data.sharingdefaultsocialacc

                    })
                     this.setState({ spinner: !this.state.spinner })
               })
               .catch(function (error) {
                    console.log(error);
               });
              
     }


     editButtonClick = () => {
          //  Alert.alert('fdfhdsf')
          if (this.state.membername === undefined || this.state.membername === "") {
               Alert.alert("Please enter the Mandatory fields.")
          }
          else if (this.state.membershortbio === undefined || this.state.membershortbio === "") {
               Alert.alert("Please enter the Mandatory fields.")
          }
         
          else {
               var details = {

                    userId: this.props.userLogged,
                    membername: this.state.membername,
                    membershipdate: this.state.membershipdate,
                    memberabout: this.state.memberabout,
                    membershortbio: this.state.membershortbio,
                    memberlocation: this.state.memberlocation,
                    memberphonenumber: this.state.memberphonenumber,
                    memberemail: this.props.userLogged,
                    membersocialaccount: this.state.membersocialaccount,
                    sharingdefaultmemdate: this.state.sharingdefaultmemdate,
                    sharingdefaultemail: this.state.sharingdefaultemail,
                    sharingdefaultphone: this.state.sharingdefaultphone,
                    sharingdefaultsocialacc: this.state.sharingdefaultsocialacc,
                    sharingdefaultlocation: this.state.sharingdefaultlocation,
                    sharingdefaultsetmeetings: this.state.sharingdefaultsetmeetings,
                    createdby: 'admin',
                    creationdate: this.state.creationdate,
                    lastupdatedby: '01/01/2019',
                    lastupdatedate: '01/01/2019',
                    imageurl: 'imgur.com',
                    isdeleted: 'n',

               };


               // **************   writeMember

               var formBody = [];
               for (var property in details) {
                    var encodedKey = encodeURIComponent(property);
                    var encodedValue = encodeURIComponent(details[property]);
                    formBody.push(encodedKey + "=" + encodedValue);
               }
               formBody = formBody.join("&");
               console.log('Before response @' + formBody)
               fetch(serverURI + '/writeMember/' + this.props.userLogged, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    },
                    body: formBody 
               })
                    .then(response => {
                         response.json()
                         console.log('response @:' + JSON.stringify(response))
                    });

               // **************   writeMember
             
                    this.props.navigation.navigate("NewContactRequest")
               
               Alert.alert('Profile is Edited!')
          }
     }

     render() {
          const theme = {
               ...DefaultTheme,
               colors: {
                    ...DefaultTheme.colors,
                    primary: '#E36E39',
                    accent: '#2AE7FF',
               },
          }
          return (
               <View style={{ flex: 1 }}>
                     <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                    {/* ?--------------     APPBAR      ---------------- */}
                    <Appbar.Header style={{ backgroundColor: 'white' }}>
                         <Appbar.Content
                              title="Profile"
                              subtitle="Edit your Profile."
                         />

                    </Appbar.Header>

                    <View style={{ width: '100%', height: 120, backgroundColor: 'white', elevation: 4 }}>
                         <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                              <Icon2 name="user-circle-o" color="#7BD26D" size={70} />
                              <Text>{this.state.membername}</Text>
                              <Text>{this.props.userLogged}</Text>
                         </View>
                         {/* <View styles={{ position: "absolute", bottom: 0, right: 0 }}><Text >Mandatory fields*</Text></View> */}
                    </View>

                    <View style={{ flex: 1 }}>
                         <InputScrollView>
                              <TextInput
                                   label='username*'
                                   label='username*'
                                   theme={theme}
                                   autoCapitalize='none'
                                   value={this.state.membername}
                                   onChangeText={(membername) => this.setState({ membername })}
                                   style={styles.usernameInput} />
                         
                              <TextInput
                                   label='Short Bio*'
                                   label='Short Bio*'
                                   theme={theme}
                                   value={this.state.membershortbio}
                                   onChangeText={(membershortbio) => this.setState({ membershortbio })}
                                   style={styles.usernameInput} />

                              <TextInput
                                   label='About*'
                                   label='About*'
                                   theme={theme}
                                   value={this.state.memberabout}
                                   onChangeText={(memberabout) => this.setState({ memberabout })}
                                   style={styles.usernameInput} />

                              <TextInput
                                   label='Location*'
                                   label='Location*'
                                   theme={theme}
                                   value={this.state.memberlocation}
                                   onChangeText={(memberlocation) => this.setState({ memberlocation })}
                                   style={styles.usernameInput} />
                              <TextInput
                                   label='Contact Number*'
                                   label='Contact Number*'
                                   theme={theme}
                                   keyboardType='number-pad'
                                   autoCapitalize='none'
                                   value={this.state.memberphonenumber}
                                   onChangeText={(memberphonenumber) => this.setState({ memberphonenumber })}
                                   style={styles.usernameInput} />
                              <TextInput
                                   label='Social*'
                                   label='Social*'
                                   theme={theme}
                                   autoCapitalize='none'
                                   value={this.state.membersocialaccount}
                                   onChangeText={(membersocialaccount) => this.setState({ membersocialaccount })}
                                   style={styles.usernameInput} />
                              <TextInput
                                   label='Email*'
                                   label='Email*'
                                   keyboardType='email-address'
                                   theme={theme}
                                   // disabled={true}
                                   value={this.state.memberemail}
                                   onChangeText={(memberemail) => this.setState({ memberemail })}
                                   style={styles.usernameInput} />
                              <TextInput
                                   label='Member Since'
                                   label='Member Since'
                                   theme={theme}
                                   value={this.state.creationdate}
                                   disabled={true}
                                   onChangeText={(creationdate) => this.setState({ creationdate })}
                                   style={styles.usernameInput} />

                         </InputScrollView>
                    </View>
                    <Button mode="contained" onPress={() => this.editButtonClick()} style={styles.sharebutton}>
                         Edit
                </Button>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container0: {
          flex: 1,
          // justifyContent: 'flex-start',
          backgroundColor: 'white',
     },
     sharebutton: {
          backgroundColor: '#89CE3A',
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignSelf: 'center',
          elevation: 8,
     }
     
});
const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(EditProfileNewUser2);

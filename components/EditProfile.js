import React, { Component } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, ScrollView, BackHandler, RefreshControl } from 'react-native';
import { Appbar, Card, Switch, Button, TextInput, Provider as PaperProvider, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
import InputScrollView from 'react-native-input-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';

import { serverURI } from '../global';
import { connect } from 'react-redux';
import Reactotron from 'reactotron-react-native';
class EditProfile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         text: '',
         temp: 'iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
         textareaHeight: null,
         createdby: "admin",
         creationdate: "01/01/2019",
         docType: "MemberInfo",
         person: [],
         imageurl: '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',
         //imageurl: false,
         isdeleted: "n",
         lastupdatedate: "",
         lastupdatedby: "admin",
         memberabout: "",
         memberemail: "",
         memberid: "",
         memberlocation: "",
         membername: "",
         memberphonenumber: "",
         membershipdate: "",
         membershortbio: "",
         membersocialaccount: "#",
         sharingdefaultemail: "n",
         sharingdefaultlocation: "n",
         sharingdefaultmemdate: "n",
         sharingdefaultphone: "n",
         sharingdefaultsetmeetings: "n",
         sharingdefaultsocialacc: "n",
         spinner: false,
         refreshing: false,
      }
   }

   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }


   componentDidMount() {
      this.getUserDetails()
   }

   getUserDetails() {
      this.setState({ refreshing: false, persons: [] })
      this.setState({ spinner: true })

      axios(serverURI + "/readMember/" + this.props.userLogged)
         .then(response => {
            //const persons = res.data;
            //Alert.alert(response.data.membername)
            // Reactotron.log(response)
            this.setState({
               // imageurl: response.data.imageurl,
               lastupdatedate: new Date().toString().slice(0, 21),
               membername: response.data.membername,
               membershortbio: response.data.membershortbio,
               memberabout: response.data.memberabout,
               //  creationdate: response.data.creationdate,
               memberlocation: response.data.memberlocation,
               memberphonenumber: response.data.memberphonenumber,
               memberemail: response.data.memberemail,
               membersocialaccount: response.data.membersocialaccount,
               membershipdate: response.data.membershipdate,
               sharingdefaultemail: response.data.sharingdefaultemail,
               sharingdefaultlocation: response.data.sharingdefaultlocation,
               sharingdefaultmemdate: response.data.sharingdefaultmemdate,
               sharingdefaultphone: response.data.sharingdefaultphone,
               sharingdefaultsetmeetings: response.data.sharingdefaultsetmeetings,
               sharingdefaultsocialacc: response.data.sharingdefaultsocialacc

            })
            this.setState({ spinner: false })
            console.log('state of imageurl1: ' + this.state.imageurl)
         })
         .catch(function (error) {
            console.log(error);
         });
      // Reactotron.log('state of imageurl: ' + this.state.imageurl)
      console.log('state of imageurl2: ' + this.state.imageurl)
      this.setState({ visible: false })

   }

   editButtonClick = () => {
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
            imageurl: this.state.imageurl,
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

               // Alert.alert('Profile is Edited!')
               // this.props.navigation.goBack()
               console.log('response @:' + JSON.stringify(response))
            });

         Alert.alert(
            'Edit Complete.',
            'Your profile is edited.',
            [
               {
                  text: 'OK',
                  onPress: () => {
                     //this.props.navigation.state.params.refresh()
                     this.props.navigation.state.params.onNavigateBack()
                     this.props.navigation.goBack()
                  }
               }
            ],
            {
               cancelable: false
            }
         )
      }
   }
   _onRefresh = () => {
      this.getUserDetails();
   }
   handleOnNavigateBack = () => {
      setTimeout(this._onRefresh, 2500);
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

            <Card style={{
               width: '100%', height: 170, backgroundColor: 'D8DCEA',

            }}>
               <View

                  style={{
                     justifyContent: 'center', alignItems: 'center', marginTop:10,
                  }}>
                  <TouchableOpacity onPress={() => this.props.navigation.navigate('ImagePick')}>
                     <Image
                        style={{
                           width: 100,
                           height: 100,
                           resizeMode: 'contain',
                           borderRadius:50,
                        }}
                        source={{ uri: 'data:image/jpeg;base64,' + this.state.imageurl }}
                     />
                  </TouchableOpacity>
                  <Text style={{ marginTop: 5, fontSize: 18 }} >{this.state.membername}</Text>
                  <Text style={{ marginTop: 5, }}>{this.props.userLogged}</Text>
               </View>

            </Card>

            <View style={{ flex: 1, marginTop: '1%' }}>
               <InputScrollView
                  refreshControl={
                     <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                     />
                  }
               >
                  <TextInput
                     label='Name*'
                     label='Name*'
                     // keyboardType='email-address'
                     theme={theme}
                     autoCapitalize={true}
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
                     label='About Me'
                     label='About Me'
                     //placeholder='please complete this field...'
                     theme={theme}
                     value={this.state.memberabout}
                     onChangeText={(memberabout) => this.setState({ memberabout })}
                     style={styles.usernameInput} />

                  <TextInput
                     label='Location'
                     label='Location'
                     theme={theme}
                     // placeholder='Please complete this field...'
                     value={this.state.memberlocation}
                     onChangeText={(memberlocation) => this.setState({ memberlocation })}
                     style={styles.usernameInput} />
                  <TextInput
                     label='Contact Number'
                     label='Contact Number'
                     // blurOnSubmit
                     theme={theme}
                     keyboardType='phone-pad'
                     autoCapitalize='none'
                     value={this.state.memberphonenumber}
                     onChangeText={(memberphonenumber) => this.setState({ memberphonenumber })}
                     style={styles.usernameInput} />
                  <TextInput
                     label='Social'
                     label='Social'
                     theme={theme}
                     autoCapitalize='none'
                     value={this.state.membersocialaccount}
                     onChangeText={(membersocialaccount) => this.setState({ membersocialaccount })}
                     style={styles.usernameInput} />
                  <TextInput
                     label='Email'
                     label='Email'
                     keyboardType='email-address'
                     theme={theme}
                     disabled={true}
                     value={this.state.memberemail}
                     onChangeText={(memberemail) => this.setState({ memberemail })}
                     style={styles.usernameInput} />
                  <TextInput
                     label='Member Since'
                     label='Member Since'
                     theme={theme}
                     value={this.state.membershipdate.toUpperCase()}
                     disabled={true}
                     onChangeText={(membershipdate) => this.setState({ membershipdate })}
                     style={styles.usernameInput} />

               </InputScrollView>
            </View>



            <Card style={{ backgroundColor: '#EAE9EA', elevation: 10 }}>
               <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                  <Button mode="contained" onPress={() => this.props.navigation.goBack()}
                     style={styles.cancelbutton}>
                     Cancel
                              </Button>
                  <Button mode="contained" onPress={() => this.editButtonClick()} style={styles.savebutton}>
                     Save
                              </Button>
               </View>
            </Card>
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
   spinnerTextStyle: {
      color: '#FFF',
      fontSize: 14,
   },
   cancelbutton: {
      backgroundColor: '#999999',
      width: '45%',
      height: 50,
      marginRight: '2.5%',
      justifyContent: 'center',
      elevation: 2,
      marginTop: 10,
      marginBottom: 10,
   },
   savebutton: {
      backgroundColor: '#89CE3A',
      width: '45%',
      height: 50,
      marginLeft: '2.5%',
      justifyContent: 'center',
      elevation: 2,
      marginTop: 10,
      marginBottom: 10,

   },
   usernameInput: {
      backgroundColor: '#FFFFFF'
   }
});
const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(EditProfile);

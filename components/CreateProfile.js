import React, { Component } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, ScrollView, BackHandler } from 'react-native';
import { Appbar, Card, Switch, Button, TextInput, Provider as PaperProvider, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
import InputScrollView from 'react-native-input-scroll-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import { serverURI } from '../global';
import { connect } from 'react-redux';
class CreateProfile extends Component {
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
         lastupdatedate: "null",
         lastupdatedby: "admin",
         memberabout: "",
         memberemail: "",
         memberid: "",
         memberlocation: "",
         membername: "",
         memberphonenumber: "",
         membershipdate: "01/01/2019",
         membershortbio: "",
         membersocialaccount: "",
         sharingdefaultemail: "n",
         sharingdefaultlocation: "n",
         sharingdefaultmemdate: "n",
         sharingdefaultphone: "n",
         sharingdefaultsetmeetings: "n",
         sharingdefaultsocialacc: "n"
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
      this.setState({ spinner: true })
      axios(serverURI + "/readMember/" + this.props.userLogged)
         .then(response => {
            //const persons = res.data;
            //Alert.alert(response.data.membername)
            this.setState({

               membername: response.data.membername,
               membershortbio: response.data.membershortbio,
               //memberabout: response.data.memberabout,
               //creationdate: response.data.creationdate,
               // sharingdefaultemail: response.data.sharingdefaultemail,
               // sharingdefaultlocation: response.data.sharingdefaultlocation,
               // sharingdefaultmemdate: response.data.sharingdefaultmemdate,
               // sharingdefaultphone: response.data.sharingdefaultphone,
               // sharingdefaultsetmeetings: response.data.sharingdefaultsetmeetings,
               // sharingdefaultsocialacc: response.data.sharingdefaultsocialacc
            })
            this.setState({ spinner: false })
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
            membershipdate: new Date().toString().slice(3,16),
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
            creationdate: new Date().toString(),
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

         // console.log('Before response @' + formBody)

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

         this.props.navigation.navigate("NewContactRequestNewUser")
         Alert.alert('Profile Created.')
      }
   }

   render() {
      const theme = {
         ...DefaultTheme,
         colors: {
            ...DefaultTheme.colors,
            primary: '#E36E39',
            accent: '#FFFFFF',
         },
      }
      return (
         <View style={{ flex: 1 }}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />

            <View style={{
               justifyContent: 'center',
               alignItems: 'center',
               marginTop: '20%',
            }}>
               <View
                  style={{
                     width: 100,
                     height: 100,
                    // backgroundColor: 'pink'
                  }}>
                  <Icon2 name="user-circle-o" color="#7BD26D" size={100} />
               </View>
               <Text style={{ marginTop: 26 }}>{this.state.membername}</Text>
               <Text>{this.props.userLogged}</Text>
            </View>

            <View style={{}}>

               <TextInput
                  label='Name*'
                  label='Name*'
                  theme={theme}
                  autoCapitalize={true}
                  mode='outlined'
                  value={this.state.membername}
                  onChangeText={(membername) => this.setState({ membername })}
                  style={styles.usernameInput} />

               <TextInput
                  label='Short Bio*'
                  label='Short Bio*'
                  theme={theme}
                  //autoCapitalize={true}
                  mode='outlined'
                  multiline
                  blurOnSubmit
                  numberOfLines={4}
                  height={'30%'}
                  value={this.state.membershortbio}
                  onChangeText={(membershortbio) => this.setState({ membershortbio })}
                  style={styles.shortbioInput} />


               <Button
                  mode="contained"
                  style={styles.sharebutton}
                  onPress={() => this.editButtonClick()}
               >
                  Create
                         </Button>
            </View>
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
   sharebutton: {
      backgroundColor: '#66BC3D',
      width: '80%',
      height: 50,
      justifyContent: 'center',
      alignSelf: 'center',

      borderRadius: 10,
   },
   usernameInput: {
      backgroundColor: '#FFFFFF',
      width: '80%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: '5%'
   },
   shortbioInput: {
      backgroundColor: '#FFFFFF',
      width: '80%',
      justifyContent: 'center',
      alignSelf: 'center',
      marginBottom: '5%'
   }

});
const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(CreateProfile);

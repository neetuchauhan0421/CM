import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert, BackHandler } from 'react-native';
import { Button } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import { TextInput } from 'react-native-gesture-handler';
import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import { serverURI } from '../global';
import { connect } from 'react-redux';
import axios from 'axios';
import Reactotron from 'reactotron-react-native';
class ImagePick extends Component {
   constructor(props) {
      super(props);

      this.state = {
         pickedImage: null,
         avatarSource: null,
         base64Image: '',
         base64String: null,

         text: '',
         textareaHeight: null,
         createdby: "admin",
         creationdate: "01/01/2019",
         docType: "MemberInfo",
         imageurl: null,
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
         sharingdefaultsocialacc: "n",
         spinner: false,
      };
   }


   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }

   componentDidMount() {
      this.setState({ spinner: true })
      axios(serverURI + "/readMember/" + this.props.userLogged)
         .then(response => {

            this.setState({

               membername: response.data.membername,
               membershortbio: response.data.membershortbio,
               memberabout: response.data.memberabout,
               //  creationdate: response.data.creationdate,
               memberlocation: response.data.memberlocation,
               memberphonenumber: response.data.memberphonenumber,
               memberemail: response.data.memberemail,
               membersocialaccount: response.data.membersocialaccount,

               sharingdefaultemail: response.data.sharingdefaultemail,
               sharingdefaultlocation: response.data.sharingdefaultlocation,
               sharingdefaultmemdate: response.data.sharingdefaultmemdate,
               sharingdefaultphone: response.data.sharingdefaultphone,
               sharingdefaultsetmeetings: response.data.sharingdefaultsetmeetings,
               sharingdefaultsocialacc: response.data.sharingdefaultsocialacc

            })
            this.setState({ spinner: false })
         })
         .catch(function (error) {
            console.log(error);
         });
   }


   editButtonClick = () => {

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

      // Alert.alert(
      //    'Edit Complete.',
      //    'Your profile is edited.',
      //    [
      //       {
      //          text: 'OK',
      //          onPress: () => {
      //             //this.props.navigation.state.params.refresh()
      //             this.props.navigation.state.params.onNavigateBack()
      //             this.props.navigation.goBack()
      //          }
      //       }
      //    ],
      //    {
      //       cancelable: false
      //    }
      // )

   }

   pickImageHandler = () => {
      /**
    * The first arg is the options object for customization (it can also be null or omitted for default options),
    * The second arg is the callback which sends object: response (more info in the API Reference)
    */
      const options = {
         title: 'Select Avatar',
         // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
         storageOptions: {
            skipBackup: true,
            path: 'images',
         },
      };

      ImagePicker.showImagePicker(options, (response) => {
         console.log('Response = ', response);

         if (response.didCancel) {
            console.log('User cancelled image picker');
         } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
         } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
         } else {
            const source = { uri: response.uri };
            // You can also display the image using data:
            const source2 = { uri: 'data:image/jpeg;base64,' + response.data };
            console.log(response.data)

            console.log('2###############')
            //console.log(JSON.stringify(response.data))
            this.setState({
               avatarSource: source,
               base64Image: source2,
               base64String: JSON.stringify(source2),
               // base64String: JSON.stringify(response.data),
               //imageurl: response.data.toString('base64'),
               //imageurl: JSON.stringify(source2),

               imageurl: JSON.stringify(response.data),
            });
            //console.tron = Reactotron
            Reactotron.log(this.state.imageurl)
            console.log('3###############')
            console.log(JSON.stringify(source2))
         }
      });
   }
   addAvatar = () => {
      Alert.alert('add clicked')
   }
   render() {
      return (
         <View style={styles.container}>
            {/* <Text style={styles.textStyle}>Pick Image From Camera and Gallery </Text> */}
            <View style={styles.placeholder}>
               <ImageZoom
                  cropWidth={win.width}
                  cropHeight={300}
                  imageWidth={win.width}
                  imageHeight={300}
                  //resizeMode={'contain'}   /* <= changed  */
                  resizeMethod={'auto'}
               >
                  <Image
                     source={this.state.avatarSource}
                     style={styles.uploadAvatar}
                     resizeMode={'contain'}   /* <= changed  */
                  />
               </ImageZoom>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', height: 60 }}>
               <Button mode="contained" onPress={this.pickImageHandler} style={styles.addbutton}>Pick Image</Button>
               <Button mode="contained" onPress={this.addAvatar} style={styles.addbutton}>Add</Button>
               <Button mode="contained" onPress={this.editButtonClick} style={styles.addbutton}>Edit</Button>
            </View>

            {/* <Text> {this.state.base64String}</Text>  */}
            {/* <Text>{this.state.base64String}</Text> */}
            <Image
               style={{
                  width: 51,
                  height: 51,
                  resizeMode: 'contain',
               }}
               source={{
                  uri: 'data:image/jpeg;base64,' +
                     JSON.parse(this.state.imageurl)
               }}
            />
            <Image
               style={{
                  width: 51,
                  height: 51,
                  resizeMode: 'contain',
               }}
               source={{
                  uri:
                     'data:image/png;base64,' + JSON.parse(this.state.imageurl),
               }}
            />

         </View>
      );
   }
}
const win = Dimensions.get('window');
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   addbutton: {
      backgroundColor: '#89CE3A',
      //width: 140,
      height: 40,
      marginLeft: '2.5%',
      justifyContent: 'center',
      elevation: 2,
      marginTop: 10,
      marginBottom: 10,
   },
   placeholder: {
      // width: '90%',

      height: 300,
      backgroundColor: 'grey',
   },
   uploadAvatar: {
      flex: 1,
      alignSelf: 'center',
      width: 200,
      height: 200,
   }
});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};
export default connect(mapStateToProps)(ImagePick);

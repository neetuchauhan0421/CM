import React, { Component } from 'react';
import { Platform, Alert, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView } from 'react-native';
import { Button, Provider as PaperProvider, Appbar, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { withNavigation } from 'react-navigation';
import { serverURI } from '../../global';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native';
class OptionsMenuContactCard extends Component {
     constructor(props) {
          super(props)
          this.state = {
               spinner: false,
          }
     }

   deleteContactClick = () => {
        
          axios.post(serverURI + '/deleteContact/' + this.props.mem.contactId)
             .then(response => {
                  Reactotron.log('Resp1: '+JSON.stringify(response))
                    if (response.data.success) {
                     Alert.alert(
                        'Contact Deleted.'
                        // 'Your profile is edited.',
                        // [
                        //    {
                        //       text: 'OK',
                        //       onPress: () => {
                        //          //this.props.navigation.state.params.refresh()
                                 
                        //         // this.props.navigation.state.params.onNavigateBack()
                        //         // this.props.mem.onNavigateBack
                        //          //navigation.goBack()
                        //          this._menu.hide();
                                 
                        //       }
                        //    }
                        // ],
                        // {
                        //    cancelable: false
                        // }
                     )
                       //this.props.navigation.state.params.onNavigateBack()
                    }
                    else if (response.data.errorType) {
                         Alert.alert(title = response.data.errorType)
                    }
                    else if (response.data.message) {
                         Alert.alert(title = response.data.message)
                    }
                  
               })
               .catch(function (error) {
                    console.log(error);
               })
             //  this.props.navigation.state.params.onNavigateBack()
          this._menu.hide();
         // Alert.alert(title = 'Contact is deleted.')
     };

     _menu = null;
     setMenuRef = ref => {
          this._menu = ref;
     };
     showMenu = () => {
          this._menu.show();
     };

     _meetingRequest = () => {
          this._menu.hide();
          this.props.navigation.navigate('NewMeetingRequest', {
               userID: this.props.mem.userID,
               memberId: this.props.mem.memberId,
               contactId: this.props.mem.contactId,
               memberName: this.props.mem.memberName,
               memberLocation: this.props.mem.memberLocation,
               membershipDate: this.props.mem.membershipDate,
               memberAbout: this.props.mem.memberAbout,
          }
          )
     }

   render() {
     
          return (
               <View >
                    <Spinner
                         visible={this.state.spinner}
                         textContent={'Loading...'}
                         textStyle={styles.spinnerTextStyle}
                    />
                    <Menu
                         ref={this.setMenuRef}
                         button={<Appbar.Action
                              icon="more-vert"
                              onPress={this.showMenu}
                            style={{
                               margin: -2,
                            }}
                         />}>
                         <MenuItem onPress={this._meetingRequest} >
                              {' '} <MaterialCommunityIcons name="calendar-clock" color="#7BD26D" size={24} style={{ margintop: 6 }} />
                              <Text>{'   '}Schedule Meeting</Text>
                              
                         </MenuItem>
                         <MenuDivider />
                         <MenuItem onPress={this.deleteContactClick}>
                              {'  '} <Icon name="md-trash" color="#E33939" size={24} />
                              <Text>{'    '}Delete Contact</Text>
                              
                            </MenuItem>
                    </Menu>
               </View>
          );
     }
}

const styles = StyleSheet.create({
});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};
export default withNavigation(OptionsMenuContactCard);
//export default connect(mapStateToProps)(OptionsMenuContactCard);

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView } from 'react-native';
import { Button, Provider as PaperProvider, Appbar, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import { withNavigation, StackActions, NavigationActions } from 'react-navigation';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

class OptionsMenuDashboard extends Component {
     _menu = null;

     setMenuRef = ref => {
          this._menu = ref;
     };

     hideMenu = () => {
          this._menu.hide();
     };

     showMenu = () => {
          this._menu.show();
     };

     _navigateNewContact = () => {
          this._menu.hide();
          this.props.navigation.navigate("NewContactRequest")
     }

     _navigateViewProfile = () => {
          this._menu.hide();
          this.props.navigation.navigate("ContactSelector")
     }

     _navigateSignIn = () => {
          const resetAction = StackActions.reset({
               index: 0,
               actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
          });
          this._menu.hide();
          // this.props.navigation.navigate("SignIn")
          this.props.navigation.dispatch(resetAction);
     }

     render() {

          return (

               <Menu
                    ref={this.setMenuRef}
                    button={<Appbar.Action icon="more-vert" onPress={this.showMenu} color={'white'} />}
               >
                    <MenuItem onPress={this._navigateNewContact}>
                         <MaterialCommunityIcons name="contact-mail" color="#4A90E2" size={20} />
                         {'     '}<Text style={{ fontSize: 16 }} >New Contact</Text>
                    </MenuItem>

                    <MenuDivider />

                    <MenuItem onPress={this._navigateViewProfile}>

                         <Icon name="md-calendar" color="#142F4E" size={26} />
                         {'     '}<Text style={{ fontSize: 16, }} >Schedule Meeting</Text>{' '}
                    </MenuItem>

                    <MenuDivider />

                    <MenuItem onPress={this._navigateSignIn} >
                         <Icon3 name="power-off" color="#F6931D" size={21} />
                         {'    '}<Text style={{ fontSize: 16 }} >Log Out</Text>
                    </MenuItem>

               </Menu>

          );
     }
}

const styles = StyleSheet.create({
     container0: {
          flex: 1,
          // justifyContent: 'flex-start',
          borderRadius: 0,
          backgroundColor: '#EFF1F5',
     }
});
export default withNavigation(OptionsMenuDashboard)
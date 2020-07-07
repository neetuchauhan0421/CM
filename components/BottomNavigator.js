/* @flow */

import * as React from 'react';
import { ScrollView, View, Image, Text, Dimensions, StyleSheet, FlatList, StatusBar, BackHandler, Alert, TouchableOpacity } from 'react-native';
import { BottomNavigation } from 'react-native-paper';
import Dashboard from './Dashboard.js';
import Contacts from './Contacts.js';
import ViewProfile from './ViewProfile.js';
import Meetings from './Meetings.js';
import { userIDLoggedin } from '../global.js';
import { connect } from 'react-redux';
import Button from 'react-native-button';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import FabIcon_Bottomsheet from './TinyComponents/FabIcon_Bottomsheet.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Octicons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import axios from 'axios';
import DashboardCard from './TinyComponents/DashboardCard.js';
type State = {
   index: number,
   routes: Array<{
      key: string,
      title: string,
      icon: string,
      size: number,
      color: string,
   }>
};
var screen = Dimensions.get('window');

class BottomNavigator extends React.Component {
   static title = 'Bottom Navigation';

   state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,

      userID: userIDLoggedin,
      index: 0,
      loading: false,

      refreshing: false,
      persons: [],

      notrender: false,
      routes: [
         {
            key: 'album',
            title: 'Dashboard',
            icon: 'dashboard',
            size: 90,
            color: '#4A4A4A',

         },
         {
            key: 'library',
            title: 'Contacts',
            icon: 'contacts',
            color: '#4E4E4B',

         },
         {
            key: 'library',
            color: '#4E4E4B',
            size: 80,
         },
         {
            key: 'favorites',
            title: 'Meetings',
            icon: 'today',
            color: '#4E4E4B',
            size: 80,
         },
         {
            key: 'purchased',
            title: 'Profile',
            icon: 'person',
            color: '#4E4E4B',
            size: 80,
         },
      ],
   };

   onClose() {
      console.log('Modal just closed');
   }

   onOpen() {
      console.log('Modal just opened');
   }

   onClosingState(state) {
      console.log('the open/close of the swipeToClose just changed');
   }

   renderList() {
      var list = [];

      for (var i = 0; i < 50; i++) {
         list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
      }

      return list;
   }


   onButtonPress = () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
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

   componentDidMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress');
   }

   render() {

      return (
         <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content"
               backgroundColor="#000000"

            />

            <BottomNavigation
               labeled={false}
               //shifting={false}

               navigationState={this.state}
               onIndexChange={index => this.setState({ index })}
               renderScene={BottomNavigation.SceneMap({
                  album: Dashboard,
                  library: Contacts,
                  favorites: Meetings,
                  purchased: ViewProfile,
               })}
            />
            <TouchableOpacity onPress={() => { this.refs.modal4.open() }} style={styles.fab}>
               <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
            {/* <FabIcon_Bottomsheet navigation={this.props.navigation} userID={this.state.userID} /> */}
            {/* Bottom sheet */}
            <Modal
               style={styles.modal}
               position={"bottom"}
               ref={"modal4"}
            //animationDuration={500}
            >
               <View style={{ marginTop: 10, padding: 10, paddingLeft: 20 }}>
                  <Text style={{ fontSize: 18 }} >Create New</Text>
               </View>

               <View style={{
                  backgroundColor: '#EAEAEA', height: 2, alignSelf: 'center', margin: 5,
                  width: '90%',
               }} />

               <TouchableOpacity style={{
                  flex: 1, flexDirection: 'row', padding: 20,
                  height: 30,
                  ////backgroundColor: 'pink',
               }}

                  onPress={() => {
                     this.refs.modal4.close()
                     this.props.navigation.navigate('NewContactRequest')
                     // Alert.alert('contact clicked')
                  }}
               >
                  <MaterialCommunityIcons name="contact-mail" color="#89CE3A" size={30} />
                  <Text
                     style={{
                        // color: '#757575',
                        fontSize: 16,
                        paddingTop: 5,
                     }}>
                     {'\t'}New Contact </Text>
               </TouchableOpacity>

               <View style={{ backgroundColor: '#EAEAEA', height: 2, width: '90%', alignSelf: 'center' }} />

               <TouchableOpacity style={{
                  flex: 1, flexDirection: 'row', marginTop: 5, padding: 20,
                  //backgroundColor: 'pink',
               }}

                  onPress={() => {
                     this.refs.modal4.close()
                     this.props.navigation.navigate('ContactSelector')
                     // Alert.alert('contact clicked')
                  }}
               >
                  <MaterialCommunityIcons name="calendar-clock" color="#89CE3A" size={30} />
                  <Text
                     style={{
                        // color: '#757575',
                        fontSize: 16,
                        paddingTop: 5,
                     }}>
                     {'\t'}New Meeting Request  </Text>
               </TouchableOpacity>

               <TouchableOpacity style={{ height: 20 }} />



            </Modal>




         </View>
      );
   }
}

const styles = StyleSheet.create({


   fab: {
      position: 'absolute',
      width: 70,
      height: 70,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      // right: '41%',
      // left: '41%',
      bottom: 10,
      backgroundColor: '#89CE3A',
      borderRadius: 40,


   },
   fabIcon: {
      marginBottom: 4,
      fontSize: 40,
      color: 'white'
   },
   modal: {
      //  position: 'absolute',
      // width: '98%',
      position: 'absolute',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      elevation: 10,
      height: 230,
   },


});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(BottomNavigator);


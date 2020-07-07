import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl, BackHandler } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import ContactCard from './TinyComponents/ContactSelectorCard.js'
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { serverURI } from '../global';
import { userIDLoggedin } from '../global';
import { connect } from 'react-redux';

class ContactSelector extends Component {
   constructor(props) {
      super(props)
      this.state = {
         persons: [],
         visible: false,
         spinner: false,
         refreshing: false,
         userID: this.props.navigation.getParam('userID', 'no_userid'),
      }
   }
   componentDidMount() {
      this._getData();
   }
   componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', () => this.props.navigation.goBack());
   }
   _getData = () => {
      this.setState({ spinner: true, refreshing:true })

      axios.get(serverURI + '/getContactList/' + this.props.userLogged)
         .then(response => {
            //const persons = res.data;
            this.setState({ persons: response.data.contactList });
            this.setState({ spinner: false,refreshing: false })
         })
         .catch(function (error) {
            console.log(error);
         })
   }

   cardClick(person) {

      this.props.navigation.navigate('NewMeetingRequest', {
         userID: this.state.userID,
         memberId: person.memberId,
         contactId: person.contactId,
         memberName: person.memberName,
         memberLocation: person.memberLocation,
         membershipDate: person.membershipDate,
         memberAbout: person.memberAbout,
      }
      )
   }
   _onRefresh = () => {
      this._getData()
   }
   render() {
      const { navigation } = this.props;
      return (
         <View style={styles.container0}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            <Text
               style={{ fontSize: 21, marginTop: 5, marginLeft: 35, }}>
               Select Contact
                    </Text>

            

            <ScrollView
               refreshControl={
               <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh}
               />
            } >

               {!this.state.persons.length
                  ?
                  <View
                     style={{
                        marginTop: '53%', alignContent: 'center',
                     }}>
                     <Text style={{
                        fontSize: 20, alignSelf: 'center',
                        fontWeight: 'bold', color: '#999999'
                     }}>
                        No Contacts
      </Text>
                  </View>
                  :
                  <View
                     style={{
                        flex: 1,
                        flexDirection: 'row',
                        margin: 3,
                     }}>
                     <Text
                        style={{
                           fontSize: 28, fontWeight: 'bold', marginTop: '2%',
                           alignSelf: 'flex-start', color: '#999999'
                        }}>
                        {'  '}{this.state.persons.length}
                     </Text>
                     <Text style={{
                        fontSize: 28, marginTop: '2%', alignSelf: 'flex-start',
                        color: '#999999'
                     }}>
                        {' '}contacts
      </Text>
                  </View>
               }

               {this.state.persons.map((person, i) =>

                  <Card style={styles.cardBox} onPress={_ => this.cardClick(person)}>

                     <View
                        style={{
                           flex: 1,
                           flexDirection: 'row',
                           // backgroundColor: 'grey'
                        }}>
                        <View
                           style={{
                              width: '24%',
                              justifyContent: 'flex-start', alignItems: 'flex-start',
                              //paddingLeft: '3%',
                              //paddingTop: 15,
                              // backgroundColor:'orange'
                           }}>
                           <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                        </View>

                        <View
                           style={{
                              width: '67%',
                              // paddingTop: 15,
                              paddingLeft: '3%',
                              // backgroundColor: 'pink'
                           }}>

                           <Text style={{ fontSize: 17, color: '#000000' }}>
                              {person.memberName}
                           </Text>

                           {/* <Text>{person.memberId}</Text> */}
                           {/* <Text>{person.contactId}</Text> */}

                           <Text
                              style={{ flex: 1, flexWrap: 'wrap', fontSize: 13, marginTop: 3, color: '#000000' }}>
                              {person.memberAbout}
                           </Text>

                           {/* membershipDate */}
                           <Text style={{ display: person.membershipDate ? 'flex' : 'none', color: '#757575', fontSize: 12, marginTop: 4 }}>Member Since{' '}
                              {person.membershipDate}
                           </Text>

                           {/* location */}
                           <View style={{
                              flex: 1, flexDirection: 'row', display: person.memberLocation ? 'flex' : 'none', marginTop: 10,
                              //  backgroundColor: 'pink'
                           }}>
                              <Icon name="md-flag" color="#8320F4" size={20} />
                              <Text
                                 style={{
                                    color: '#757575',
                                    fontSize: 12,
                                    paddingTop: 2,
                                 }}>
                                 {'   '}{person.memberLocation}
                              </Text>
                           </View>

                           {/* phone */}
                           <View style={{
                              flex: 1, flexDirection: 'row', display: person.memberPhonenumber ? 'flex' : 'none', marginTop: 10,
                              //  backgroundColor: 'pink'
                           }}>
                              <Icon2 name="phone" color="#8320F4" size={20} />
                              <Text
                                 style={{
                                    color: '#757575',
                                    fontSize: 12,
                                    paddingTop: 2,
                                 }}>
                                 {'  '}{person.memberPhonenumber}
                              </Text>
                           </View>

                           {/* email */}

                           <View style={{
                              flex: 1, flexDirection: 'row', display: person.memberEmail ? 'flex' : 'none', marginTop: 10,
                              //  backgroundColor: 'pink'
                           }}>
                              <Icon name="md-mail" color="#8320F4" size={18} />
                              <Text
                                 style={{
                                    color: '#757575',
                                    fontSize: 12,
                                    paddingTop: 1,
                                 }}>
                                 {'  '}{person.memberEmail}
                              </Text>
                           </View>
                           {/* social */}
                           <View style={{
                              flex: 1, flexDirection: 'row', display: person.membersocialaccount ? 'flex' : 'none', marginTop: 10,
                              // backgroundColor: 'pink'
                           }}>
                              <Icon2 name="hashtag" color="#8320F4" size={16} />
                              <Text
                                 style={{
                                    color: '#757575',
                                    fontSize: 12,
                                    paddingTop: 1,
                                 }}>
                                 {'  '}{person.membersocialaccount}
                              </Text>
                           </View>

                           <Text style={{ display: person.memberDetails ? 'flex' : 'none' }}>
                              {person.memberDetails}
                           </Text>
                        </View>
                     </View>
                  </Card>
               )}
            </ScrollView>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   container0: {
      flex: 1,
      // justifyContent: 'flex-start',
      backgroundColor: '#F2F2F2',
   },
   spinnerTextStyle: {
      color: '#FFFFFF',
      fontSize: 14,
   },
   cardBox: {
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 4,
      marginTop: 10,
      marginBottom: 10,
      // paddingTop: '3%',
      padding: 10,
      elevation: 3,
   }
});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(ContactSelector);


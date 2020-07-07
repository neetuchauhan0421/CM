import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { serverURI } from '../../global.js';
import OptionsMenuContactCard from '../TinyComponents/OptionsMenuContactCard';
import Spinner from 'react-native-loading-spinner-overlay';
import AllContactCard from '../TinyComponents/AllContactCard.js';
import { connect } from 'react-redux';

class ContactList extends Component {

   constructor(props) {
      super(props)
      this.state = {
         persons: [],
         visible: false,
         spinner: false,
         refreshing: false,
      }
   }
   _getData = () => {
      this.setState({ spinner: true })
      // this.setState({ refreshing: !this.state.refreshing })
      axios.get(serverURI + '/getContactList/' + this.props.userLogged)
         .then(response => {
            //const persons = res.data;
            this.setState({ persons: response.data.contactList });
            // this.setState({ refreshing: !this.state.refreshing })
            this.setState({ spinner: false })
         })
         .catch(function (error) {
            console.log(error);
         })
   }
   componentDidMount() {
      this._getData()
   }
   _onRefresh = () => {
      this._getData()
   }

   handleOnNavigateBack = () => {
      setTimeout(this._onRefresh, 2500);
   }
   render() {

      return (
         <View style={styles.container0}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            <ScrollView
               refreshControl={
                  <RefreshControl
                     refreshing={this.state.refreshing}
                     onRefresh={this._onRefresh}
                  />
               }>

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
                     
                     {this.state.persons.length === 1
                        ?
                        <Text style={{
                           fontSize: 28, marginTop: '2%', alignSelf: 'flex-start',
                           color: '#999999'
                        }}>
                           {' '}contact
                     </Text>
                        :
                        <Text style={{
                           fontSize: 28, marginTop: '2%', alignSelf: 'flex-start',
                           color: '#999999'
                        }}>
                           {' '}contacts
                     </Text>
                        }

                  </View>
               }

               {this.state.persons.map((person, i) =>

                  <Card style={styles.cardBox}>

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
                              paddingLeft: '3%',
                              paddingTop: 15,
                              // backgroundColor:'orange'
                           }}>
                           <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                        </View>

                        <View
                           style={{
                              width: '67%',
                              paddingTop: 15,
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

                        <View style={{
                           transform: [{ rotate: '0deg' }],
                           // elevation: 5,
                           //backgroundColor: 'skyblue',
                           paddingTop: 10,
                        }}>
                           <OptionsMenuContactCard

                              navigation={this.props.navigation}
                              mem={{
                                 userID: this.props.userLogged,
                                 memberId: person.memberId,
                                 contactId: person.contactId,
                                 memberName: person.memberName,
                                 memberLocation: person.memberLocation,
                                 membershipDate: person.membershipDate,
                                 memberAbout: person.memberAbout,
                                 onNavigateBack: this.handleOnNavigateBack
                              }}>
                           </OptionsMenuContactCard>
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
      backgroundColor: '#F2F2F2',
   },
   spinnerTextStyle: {
      color: '#FFF',
      fontSize: 12,
   },
   cardBox: {
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 4,
      marginTop: 10,
      marginBottom: 6,
      //paddingTop: '5%',
      paddingBottom: '5%',
      elevation: 3,

   }
});
const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(ContactList);


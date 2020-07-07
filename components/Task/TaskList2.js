import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl, Alert, ListView, TouchableOpacity } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { withNavigation } from 'react-navigation';

import { serverURI } from '../../global';
import { userIDLoggedin } from '../../global.js';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import DashboardCard from '../TinyComponents/DashboardCard.js';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/AntDesign';
import 'prop-types';

class TaskList extends Component {
   constructor(props) {
      super(props)
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
         persons: [],
         visible: false,
         taskTab: this.props.switchtab,
         refreshing: false,
         spinner: false,
         userID: this.props.userID,
         basic: true,
         listViewData: Array(1).fill('').map((_, i) => `item #${i}`),
         temp: this.props.memberNameProp,
         taskId_p: this.props.taskIdProp,
         approveTask: '',
      }
   }

   deleteRow(secId, rowId, rowMap, deleteTaskID) {
      this.setState({ spinner: true })
      axios.get(serverURI + '/denyRequest/' + deleteTaskID)
         .then(response => {
            if (response.data.status === true) {
               //   this.setState({ refreshing: true });
               Alert.alert(title = 'Request is Denied.')
            }
            else if (response.data.errorType) {
               Alert.alert(title = response.data.errorType)
            }
            else if (response.data.message) {
               Alert.alert(title = response.data.message)
            }
            this.setState({ spinner: false })
            setTimeout(this._onRefresh, 3000);
         })
         ;
      rowMap[`${secId}${rowId}`].closeRow();

   }

   confirmMeetingClick(approveTaskId) {



      this.setState({ spinner: !this.state.spinner })
      // this.setState({ refreshing: !this.state.refreshing })
      axios.post(serverURI + '/acceptMeetingRequest/' + approveTaskId)
         .then(response => {
            //const persons = res.data;
            console.log(response)
            // this.setState({ persons: response.data.taskList });
            this.setState({ spinner: !this.state.spinner })
            //Alert.alert("Meeting request is accepted.")
            //this.setState({ refreshing: !this.state.refreshing })
            setTimeout(this._onRefresh, 3000);
         })
         .catch(function (error) {
            console.log(error);
         })

   }


   _getData = () => {
      this.setState({ persons: [] })
      this.setState({ spinner: true })
      // this.setState({ refreshing: !this.state.refreshing })
      axios.get(serverURI + '/getTaskList/' + this.state.userID)
         .then(response => {
            //const persons = res.data;
            console.log(response)
            this.setState({ persons: response.data.taskList.reverse() });
            this.setState({ spinner: false })
            //this.setState({ refreshing: !this.state.refreshing })
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
                        No active requests
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
                           {' '}active request
                     </Text>
                        :
                        <Text style={{
                           fontSize: 28, marginTop: '2%', alignSelf: 'flex-start',
                           color: '#999999'
                        }}>
                           {' '}active requests
                        </Text>
                     }

                  </View>
               }

               {this.state.persons.map((person, i) =>

                  <SwipeListView
                     dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                     renderRow={data => (
                        <Card style={styles.cardstyle}  >

                           <View style={styles.rowFront2}>
                              <View
                                 style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    //backgroundColor: 'pink',
                                    marginRight: 4,
                                 }}>
                                 <Icon3 name="left" color="#D8DCEA" size={20} />
                              </View>

                              <View
                                 style={{
                                    width: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    // backgroundColor:'skyblue'
                                 }}>
                                 <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                              </View>

                              <View
                                 style={{
                                    width: '64%',
                                    justifyContent: 'center', alignItems: 'flex-start',
                                    marginLeft: 10,
                                    // backgroundColor:'pink'
                                 }} >
                                 <Text
                                    style={{
                                       color: person.taskType === 'meeting' ? '#E78E00' : '#7A00F4',
                                       fontSize: 13,
                                       // textTransform: 'uppercase'
                                    }}>
                                    {person.taskType.toUpperCase()}

                                 </Text>

                                 <Text
                                    style={{
                                       fontSize: 18,
                                       color: '#000000',
                                       //marginTop: 3,
                                    }}>
                                    {person.memberName}
                                 </Text>

                                 {/* <Text style={{ marginTop: '1%' }}>
         {person.memberShortBio}
     </Text> */}

                                 <View style={{ flexDirection: 'row' }}>
                                    <Text
                                       style={{
                                          flex: 1,
                                          flexWrap: 'wrap', fontSize: 13, marginTop: 3,
                                          color: '#000000'
                                       }}>
                                       {person.memberAbout}
                                    </Text>
                                 </View>

                                 <Text
                                    style={{
                                       fontSize: 12,
                                       marginTop: 4,
                                       color: 'grey'
                                    }}>
                                    Member Since{' '}{person.memberDetails}
                                 </Text>
                              </View>


                              <View style={{
                                 justifyContent: 'center',
                                 alignItems: 'center',
                                 //  backgroundColor: 'pink',

                              }}>
                                 <Icon3 name="right" color="#D8DCEA" size={20} />
                              </View>
                           </View>
                        </Card>
                     )}

                     renderHiddenRow={(data, secId, rowId, rowMap) => (
                        <View >
                           <TouchableOpacity
                              style={[styles.backLeftBtn]}
                              onPress={_ => this.deleteRow(secId, rowId, rowMap, person.taskId)}>
                              <Text style={{
                                 marginLeft: '10%',
                                 fontSize: 16,
                                 color: '#FFFFFF',
                                 paddingLeft: 10,
                                 // fontWeight: 'bold',
                              }}>DENY</Text>
                           </TouchableOpacity>

                           <TouchableOpacity
                              style={[styles.backRightBtn]}
                              onPress={_ => {
                                 rowMap[`${secId}${rowId}`].closeRow();

                                 if (person.taskType === 'contact') {
                                    this.props.navigation.navigate("ShareDetails", { taskID: person.taskId, userID: this.state.userID, onNavigateBack: this.handleOnNavigateBack })
                                 }
                                 else if (person.taskType === 'meeting') {

                                    this.confirmMeetingClick(person.taskId)
                                 }
                              }}>
                              <Text style={{
                                 marginRight: '10%',
                                 fontSize: 16,
                                 // fontWeight:'bold',
                              }}>APPROVE</Text>
                           </TouchableOpacity>

                        </View>
                     )}
                     leftOpenValue={100}
                     rightOpenValue={-100}
                  />

                  // *************************  DASHBOARD CARD
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
      fontSize: 14,
   },

   cardstyle: {
      // flex:1,
      // flexDirection: 'row',
      //backgroundColor: '#FFFFFF',
      // alignItems: 'center',
      // justifyContent: 'center',
      alignSelf: 'center',
      //padding: 3,
      // paddingBottom:'2%',
      marginTop: 10,
      marginBottom: 5,
      width: '95%',
      height: 120,
      borderRadius: 3,
      elevation: 3,
   },
   rowFront2: {
      flex: 1,
      flexDirection: 'row',
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      height: 120,
      // elevation: 5,
   },
   backLeftBtn: {
      textAlign: 'left',
      alignItems: 'flex-start',
      backgroundColor: '#E33939',
      fontSize: 14,
      justifyContent: 'center',
      borderRadius: 5,
      flex: 0,
      left: '2.5%',
      marginTop: 10,
      width: '50%',
      height: 120,
   },
   backRightBtn: {
      textAlign: 'right',
      alignItems: 'flex-end',
      backgroundColor: '#89CE3A',
      color: 'white',
      justifyContent: 'center',
      position: 'absolute',
      borderRadius: 5,
      flex: 0,
      right: '2.5%',
      marginTop: 10,
      width: '50%',
      height: 120,
   },

});

export default withNavigation(TaskList);
import React, { Component } from 'react';
import { ListView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

import { SwipeListView } from 'react-native-swipe-list-view';
import { Card } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { serverURI } from '../../global';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import 'prop-types';
import axios from 'axios';
class DashboardCard extends Component {
     constructor(props) {
          super(props);
          this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
          this.state = {
               basic: true,
               listViewData: Array(1).fill('').map((_, i) => `item #${i}`),
               temp: this.props.memberNameProp,
               taskId_p: this.props.taskIdProp,
               userID: this.props.userID,
          };
     }

     deleteRow(secId, rowId, rowMap) {
          axios.get(serverURI + '/denyRequest/' + this.state.taskId_p)
               .then(response => {
                    if (response.data.status === true) {
                         this.setState({ refreshing: true });
                         Alert.alert(title = 'Request is Denied.')
                    }
                    else if (response.data.errorType) {
                         Alert.alert(title = response.data.errorType)
                    }

                    else if (response.data.message) {
                         Alert.alert(title = response.data.message)
                    }
               })
               ;
          rowMap[`${secId}${rowId}`].closeRow();
          this.props.handler 
     }

     confirmMeetingClick = () => {

          var details = {
          };
          var formBody = [];
          for (var property in details) {
               var encodedKey = encodeURIComponent(property);
               var encodedValue = encodeURIComponent(details[property]);
               formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");
          console.log('Before response @' + formBody)
          fetch(serverURI + '/acceptMeetingRequest/' + this.state.taskId_p, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
               },
               body: formBody
          })
               .then(response => {
                    response.json()
                    console.log('response @:' + JSON.stringify(response))
                    //  this.setState({ spinner: !this.state.spinner })
                    Alert.alert("Meeting request is accepted.")
               });
          this.props.handler
     }

     render() {

          return (
               // *************************  DASHBOARD CARD
               <View>
                    <SwipeListView
                         dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                         renderRow={data => (
                              <Card style={styles.rowFront}  >
                                   <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                        <Icon2 name="user-circle-o" color="#2D3E52" size={60} />
                                   </View>
                                   <View style={{ flex: 1, justifyContent: 'flex-end', marginLeft: '30%', marginBottom: '20%' }}>
                                        <Text
                                             style={{
                                                  color: this.props.taskTypeProp === 'meeting' ? '#E78E00' : '#7A00F4',
                                                  fontSize: 21
                                             }}>
                                             {this.props.taskTypeProp}
                                             {/* {this.props.taskIdProp} */}
                                        </Text>
                                        <Text style={{ fontSize: 18, marginTop: '1%' }}>
                                             {this.props.memberNameProp}
                                        </Text>

                                        {/* <Text style={{ marginTop: '1%' }}>
                            {this.props.memberShortBioProp}
                        </Text> */}
                                        <Text>
                                             {this.props.memberAboutProp}
                                        </Text>

                                        <Text style={{ marginTop: '2%', color: 'grey' }}>
                                             {this.props.memberDetailsProp}
                                        </Text>
                                   </View>
                              </Card>
                         )}

                         renderHiddenRow={(data, secId, rowId, rowMap) => (
                              <View >
                                   <TouchableOpacity
                                        style={[styles.backLeftBtn]}
                                        onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                                        <Text style={{ marginLeft: '10%', fontSize: 16 }}>DENY</Text>
                                   </TouchableOpacity>

                                   <TouchableOpacity
                                        style={[styles.backRightBtn]}
                                        onPress={() => {

                                             rowMap[`${secId}${rowId}`].closeRow();
                                             if (this.props.taskTypeProp === 'contact') {
                                                  this.props.navigation.navigate("ShareDetails", { taskID: this.state.taskId_p, userID: this.state.userID })
                                             }

                                             else if (this.props.taskTypeProp === 'meeting') {
                                                  this.confirmMeetingClick()
                                             }
                                        }}
                                   >
                                        <Text style={{ marginRight: '10%', fontSize: 16 }}>APPROVE</Text>
                                   </TouchableOpacity>

                              </View>
                         )}
                         leftOpenValue={100}
                         rightOpenValue={-100}
                    />
               </View>
               // *************************  DASHBOARD CARD
          );
     }
}

const styles = StyleSheet.create({

     spinnerTextStyle: {
          color: '#FFF',
          fontSize: 14,
     },

     rowFront: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          padding: '2%',
          marginTop: 10,
          marginBottom: 20,
          width: '90%',
          height: 120,
          elevation: 5,
     },
     backLeftBtn: {
          textAlign: 'left',
          alignItems: 'flex-start',
          backgroundColor: 'red',
          fontSize: 14,
          justifyContent: 'center',
          borderRadius: 5,
          flex: 0,
          left: '5%',
          marginTop: 10,
          width: '50%',
          height: 120,
     },
     backRightBtn: {
          textAlign: 'right',
          alignItems: 'flex-end',
          backgroundColor: '#7BD26D',
          color: 'white',
          justifyContent: 'center',
          position: 'absolute',
          borderRadius: 5,
          flex: 0,
          right: '5%',
          marginTop: 10,
          width: '50%',
          height: 120,
     },

});

export default withNavigation(DashboardCard);
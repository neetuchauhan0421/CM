import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Card, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import { serverURI } from '../../global';
import Icon from 'react-native-vector-icons/Ionicons';
import { refreshAction } from '../../actions/Actions';
import axios from 'axios';
import { connect } from 'react-redux';
import Icon2 from 'react-native-vector-icons/FontAwesome';
class AllMeetingsCard extends Component {
     constructor(props) {

          super(props);
          this.state = {
               MeetingId: this.props.meeting.MeetingId,
               reasonForMeeting: this.props.meeting.reasonForMeeting,
               dateOfMeeting: this.props.meeting.dateOfMeeting,
               timeOfMeeting: this.props.meeting.timeOfMeeting,
               memberId: this.props.meeting.memberId,
               visibleRemoveButton: this.props.editMode === 'Done' ? true : false,
               editmode: this.props.editMode,
          }
     }

     removeClick = () => {
          const meetingid = this.state.MeetingId
          Alert.alert(
               'Remove this Meeting?',
               this.props.meeting.MeetingId + ': ' + this.state.reasonForMeeting,
               [
                    { text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => removeMeetingClick() },
               ],
               { cancelable: false }
          )

          function removeMeetingClick() {

               axios.post(serverURI + '/removeMeetings/' + meetingid)
                    .then(response => {
                         if (response.data.status === true) {
                              Alert.alert(
                                   'Meeting is removed.'
                              )
                         }
                         else if (response.data.errorType) {
                              Alert.alert(
                                   title = response.data.errorType,
                              )
                         }
                         else if (response.data.message) {
                              Alert.alert(
                                   title = response.data.message,
                              )
                         }
                    });
               Alert.alert(
                    'Meeting is Removed.'
               )
          }
     }

     render() {

          return (
               //***************   MEETING CARD   ***************** */
               <Card style={styles.cardBox}>
                    <View style={{ flexDirection: 'row' }}>

                         <View style={styles.space0}>
                              {this.props.editMode === 'Edit'
                                   ?
                                   (<View style={{ width: '25%', height: 25 }} />)
                                   :
                                   (<View >
                                        <Icon name="md-remove-circle" color="#FF4968" size={25} onPress={this.removeClick} />
                                        {/* <Text style={styles.removebtn}  >-</Text> */}
                                   </View>)
                              }
                              <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 25 }}>
                                   <Text>{this.state.dateOfMeeting.slice(0, 3)}</Text>
                                   <Text>{this.state.dateOfMeeting.slice(4, 10)}</Text>
                                   <Text>{this.state.dateOfMeeting.slice(11, 15)}</Text>
                              </View>
                         </View>
                         <View style={styles.space1}>
                              {/* <Text>{this.state.MeetingId}</Text> */}
                              <Text style={{ fontSize: 18 }}>{this.state.reasonForMeeting}</Text>
                              <Text>{this.state.timeOfMeeting}</Text>
                              <Text>With {this.state.memberId}</Text>
                         </View>
                    </View>
               </Card>
               //***************   MEETING CARD   ***************** */
          );
     }
}

const styles = StyleSheet.create({

     removebtn: {
          width: '25%',
          height: 25,
          borderTopLeftRadius: 5,
          borderBottomRightRadius: 5,
          color: 'white',
          fontSize: 20,
          textAlign: 'center',
          backgroundColor: '#DB040D',
     },
     space0: {
          width: '30%',
          flexDirection: 'column'
     },
     space1: {
          width: '70%',
          backgroundColor: '#6FBDFF',
          padding: '3%',
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
     },
     cardBox: {
          flexDirection: 'row',
          alignSelf: 'center',
          width: '90%',
          borderRadius: 4,
          marginTop: 10,
          marginBottom: 5,
          elevation: 2,
     }
});
const mapStateToProps = state => ({});
export default connect(mapStateToProps, {
     refreshAction,
})(AllMeetingsCard);

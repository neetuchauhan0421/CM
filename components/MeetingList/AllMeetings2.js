import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl, Alert } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { serverURI } from '../../global.js';
import AllMeetingsCard from '../TinyComponents/AllMeetingsCard.js';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from 'react-redux';
import { refreshAction } from '../../actions/Actions';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Reactotron from 'reactotron-react-native';

class AllMeetings extends Component {
   constructor(props) {
      super(props)
      this.state = {
         persons: [],
         sortedPersons: [],
         visible: false,
         refreshing: false,
         spinner: false,
         refreshList: false,
         dateFlag: '',
      }
   }

   _getData = () => {
      //var temparray = [];
      this.setState({ spinner: true })
      // this.setState({ refreshing: !this.state.refreshing })
      axios.get(serverURI + '/getOpenMeetings/' + this.props.userLogged)
         .then(response => {
            //const persons = res.data;
            this.setState({ persons: response.data });
            var temparray = this.state.persons;


            //   this.setState({ refreshing: !this.state.refreshing })
            this.setState({ spinner: false })
            //Reactotron.log('@@@@@@@@@ Persons@@@@@@@@@@')
            Reactotron.log(this.state.persons)
            //console.log('@@@@@@@@@ temparray @@@@@@@@@@')
            // console.log(temparray)
            temparray.sort(function (a, b) {
               // Turn your strings into dates, and then subtract them
               // to get a value that is either negative, positive, or zero.
               return new Date(a.dateOfMeeting) - new Date(b.dateOfMeeting);
            });
            this.setState({ sortedPersons: temparray })

            Reactotron.log('@@@@@@@@@ temparray sorted @@@@@@@@@@')
            Reactotron.log(temparray)

            var a = new Date();
            for (let i = 0; i <= this.state.sortedPersons.length; i++) {
               // Reactotron.log('@@@ before loop @@@'+i)
               Reactotron.log('@@@ before loop ' + this.state.sortedPersons[i].dateOfMeeting)
               //Reactotron.log()
               if (new Date(this.state.sortedPersons[i].dateOfMeeting) > new Date(a)) {
                  Reactotron.log('@@@ in loop @@@' + this.state.sortedPersons[i].dateOfMeeting)

                  this.setState({ dateFlag: this.state.sortedPersons[i].dateOfMeeting });
                  /////Reactotron.log(this.state.dateFlag);
                  break;
               }
            }


         })
         .catch(function (error) {
            console.log(error);
         })
      Reactotron.log('@@@@@@@@@ dateFlag  @@@@@@@@@@')
      Reactotron.log(this.state.dateFlag)
   }
   componentDidMount() {
      this._getData()

   }
   componentWillUnmount() {

   }
   _onRefresh = () => {
      this.componentDidMount()
   }

   removeClick(meetingID) {
      this.setState({ spinner: true })
      axios.post(serverURI + '/removeMeetings/' + meetingID)
         .then(response => {
            if (response.data.status) {
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
            this.setState({ spinner: false })
            setTimeout(this._onRefresh, 2000);
         });

   }

   formatAMPM = (date) => {
       
         var hours = date.getHours();
         var minutes = date.getMinutes();
         var ampm = hours >= 12 ? 'PM' : 'AM';
         hours = hours % 12;
         hours = hours ? hours : 12; // the hour '0' should be '12'
         minutes = minutes < 10 ? '0'+minutes : minutes;
         var strTime = hours + ':' + minutes + ' ' + ampm;
         return strTime;
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
                  />}>

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
                        No Meetings
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
                           {' '}meeting
                     </Text>
                        :
                        <Text style={{
                           fontSize: 28, marginTop: '2%', alignSelf: 'flex-start',
                           color: '#999999'
                        }}>
                           {' '}meetings
                     </Text>
                     }

                  </View>
               }

               {this.state.sortedPersons.map((person, i) =>
                  //***************   MEETING CARD   ***************** */
                  <View>
                     {/* Time in this Instance */}
                  {
                     this.state.dateFlag=== person.dateOfMeeting
                        ?
                        (
                           <View style={{ flex: 1, flexDirection: 'row', marginTop: 5, }}>
                                 <Text
                                    style={{
                                       marginLeft: 10,
                                       color: '#039BE5', alignSelf: 'center', elevation: 3
                                    }}>
                                    {' '}{this.formatAMPM(new Date()) }{'  '}</Text>
                              <View
                                 style={{ backgroundColor: '#039BE5', width:20, height:20, borderRadius:10, elevation:3}} />
                              <View style={{ width: '77%', height: 3, backgroundColor: '#039BE5', justifyContent: 'center', alignSelf: 'center',  }} />
                           </View>
                        )
                        :
                        null
                     }
                     {/* Meeting card */}
                     <Card style={styles.cardBox}>
                        <View style={{ flexDirection: 'row' }}>

                           <View style={styles.space0}>
                              {this.props.editMode === 'Edit'
                                 ?
                                 (<View style={{ width: 30, }} />)
                                 :
                                 (<View style={{ width: 30, justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon name="md-remove-circle" color="#E33939" size={30} onPress={_ => { this.removeClick(person.MeetingId, person.reasonForMeeting) }} />
                                    {/* <Text style={styles.removebtn}  >-</Text> */}
                                 </View>)
                              }
                              <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: 30 }}>
                                 {/* date */}
                                 <Text
                                    style={{
                                       fontSize: 32,
                                    color:new Date(this.state.dateFlag)<= new Date(person.dateOfMeeting)?'#039BE5':'black'
                                    }}>
                                    {person.dateOfMeeting.slice(8, 10).toUpperCase()}
                                 </Text>
                                 {/* day */}
                                 <Text
                                    style={{
                                    fontSize: 14,
                                    color:new Date(this.state.dateFlag)<= new Date(person.dateOfMeeting)?'#039BE5':'black'
                                 }}>
                                    {person.dateOfMeeting.slice(0, 3).toUpperCase()}
                                 </Text>
                                 {/* month year */}
                                 <Text style={{ color: '#747475', marginTop: '3%' }}>
                                    {person.dateOfMeeting.slice(4, 7).toUpperCase()}{' '}{person.dateOfMeeting.slice(11, 15)}
                                 </Text>
                                
                              </View>
                           </View>
                           
                           {/* row 2 */}
                           <View style={styles.space1}>
                           
                              <Text style={{ fontSize: 18, color: '#FFFFFF', fontWeight: "bold" }}>{person.reasonForMeeting}{'\n'}
                              </Text>

                              <Text style={{ color: '#FFFFFF' }}>
                                 Time:{'\t'}{this.formatAMPM(new Date(person.dateOfMeeting))}
                                
                              </Text>
                              <Text style={{ color: '#FFFFFF' }}>With:{'\t'}{person.memberId}</Text>
                           </View>
                        </View>
                     </Card>

                     {/* <Text>{person.dateOfMeeting.slice(4, 18).toUpperCase()}</Text>
                     <Text>{new Date().toString().slice(4, 18).toUpperCase()}</Text> */}

                     {/* Today's date BAR
                        thu feb 14 2019 17:21:00 gmt+0530 (ist)
                  */}
                     
                     {/* <View style={{ width:'90%', height:2, backgroundColor:'green', justifyContent:'center', alignSelf:'center'}}/> */}
                  </View>
                  //***************   MEETING CARD   ***************** */
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
   removebtn: {
      width: '10%',
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
      flexDirection: 'row',
      // backgroundColor: 'grey'
   },
   space1: {
      width: '70%',
      backgroundColor: '#039BE5',
      padding: '3%',
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
   },
   cardBox: {
      flexDirection: 'row',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 5,
      marginTop: 8,
      marginBottom: 4,
      elevation: 3,
   }
});
const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};
export default connect(mapStateToProps)(AllMeetings);


import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl, Animated } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { serverURI } from '../../global.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import DashboardCardSmall from '../TinyComponents/DashboardCardSmall.js';
import { connect } from 'react-redux';

class TaskAcceptedList extends Component {
   constructor(props) {
      super(props)
      this.state = {
         persons: [],
         refreshing: false,
         userID: this.props.userID,
         fadeAnim: new Animated.Value(0), // init opacity 0
      }
   }
   _getData = () => {
      this.setState({persons:[]})
      this.setState({ spinner: !this.state.spinner })

      axios.get(serverURI + '/getTaskAcceptedList/' + this.props.userLogged)
         .then(response => {
            console.log(response)
            //const persons = res.data;
            this.setState({ persons: response.data.taskList.reverse() });
            this.setState({ spinner: !this.state.spinner })
            // this.animator();
         })
         .catch(function (error) {
            console.log(error);
         })

   }
   animator = () => {
      
      Animated.timing(          // Uses easing functions
         this.state.fadeAnim,    // The value to drive
         { toValue: 1, duration: 500, delay:this.props.children*350 },           // Configuration
      ).start();                // Don't forget start!

   }
   componentDidMount() {
      this._getData();
   }
   _onRefresh = () => {
      
      this._getData()
   }
   render() {

      return (
         <View style={styles.container0}>
            <Spinner
               visible={this.state.spinner}
               textContent={'Loading...'}
               textStyle={styles.spinnerTextStyle}
            />
            {/* -----------------   GETTASKLIST ------------------ */}
            <ScrollView
               refreshControl={
                  <RefreshControl
                     refreshing={this.state.refreshing}
                     onRefresh={this._onRefresh}
                  />
               }
            >

               {!this.state.persons.length ?
                  <Text
                     style={{
                        textAlign: 'center',
                        //fontWeight: 'bold',
                        fontSize: 18,
                        width: '100%',
                        marginTop: '65%',

                     }}>No Accepted Tasks
                  </Text> :
                  <Text
                     style={{
                        display: 'none'
                     }} />}
               {this.state.persons.map((person, index) =>

                  <Card style={[styles.cardBox, { opacity: this.state.fadeAnim }]}
                  onLoad={this.animator()}
                  >
                     {this.props.children}
                     <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        // backgroundColor: 'grey'
                     }}>
                        <View
                           style={{
                              width: 85,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start',
                              padding: 7,
                              // paddingTop: 15,
                             //  backgroundColor:'orange'
                           }}>
                           <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                        </View>
                        <View
                           style={{
                              width: '66%',
                              justifyContent: 'center',
                              alignItems: 'flex-start',
                              //marginLeft:5,
                              // backgroundColor: 'pink'
                           }}>
                           <Text
                              style={{
                                 color: person.taskType === 'meeting' ? '#E78E00' : '#7A00F4',
                                 fontSize: 12,
                                 // paddingLeft: 10,
                              }}>
                              {person.taskType.toUpperCase()}
                           </Text>

                           <Text
                              style={{
                                 fontSize: 18,
                                 color: '#4A4A4A',
                                 // paddingLeft: 10
                              }}>
                              {person.memberName}
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
      // backgroundColor:'#EAE9EA',
   },
   spinnerTextStyle: {
      color: '#FFF',
      fontSize: 14,
   },
   cardBox: {
      // alignSelf: 'center',
      // width: '95%',
      // borderRadius: 4,
      // marginTop: 10,
      // //marginBottom: 15,
      // flex: 0,
      // padding: '1%',
      // height: 60,
      // elevation: 2,
      // flex: 1,
      // flexDirection: 'row',
      // alignSelf: 'center',
      // width: '95%',
      // borderRadius: 4,
      // marginTop: 9,
      // marginBottom: 3,
      // flexDirection: 'row',
      // justifyContent: 'space-between',
      // alignItems: 'center',
      // height: 60,
      // elevation: 2,
      backgroundColor: '#FFFFFF',
      alignSelf: 'center',
      width: '95%',
      borderRadius: 4,
      marginTop: 10,
      marginBottom: 6,
      //paddingTop: '5%',
      //paddingBottom: '5%',
      elevation: 3,

   },

});
const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(TaskAcceptedList);


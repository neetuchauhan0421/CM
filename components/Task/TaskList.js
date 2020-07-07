import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import { serverURI } from '../../global';
import { userIDLoggedin } from '../../global.js';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import DashboardCard from '../TinyComponents/DashboardCard.js';
import { connect } from 'react-redux';

class TaskList extends Component {
     constructor(props) {
          super(props)
          this.state = {
               persons: [],
               visible: false,
               taskTab: this.props.switchtab,
               refreshing: false,
               spinner: false,
               userID: this.props.userID,
          }
     }

     _getData = () => {
          this.setState({ spinner: !this.state.spinner })
          this.setState({ refreshing: !this.state.refreshing })
          axios.get(serverURI + '/getTaskList/' + this.props.userLogged)
               .then(response => {
                    this.setState({ persons: response.data.taskList });
                    this.setState({ refreshing: !this.state.refreshing })
                    this.setState({ spinner: !this.state.spinner })
               })
               .catch(function (error) {
                    console.log(error);

               })
     }

     componentDidMount() {
          this._getData()
     }

     _onRefresh = () => {
          this.componentDidMount()
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
                         }>

                         {this.state.persons.map((person, i) =>

                              <DashboardCard
                                   userID={this.state.userID}
                                   taskIdProp={person.taskId}
                                   taskTypeProp={person.taskType}
                                   memberNameProp={person.memberName}
                                   memberShortBioProp={person.memberShortBio}
                                   memberAboutProp={person.memberAbout}
                                   memberDetailsProp={person.memberDetails}
                              />
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
          backgroundColor: 'white',
     },
     spinnerTextStyle: {
          color: '#FFF',
          fontSize: 14,
     },
     cardBox: {
          alignSelf: 'center',
          width: '90%',
          borderRadius: 3,
          marginTop: 10,
          marginBottom: 15,
          padding: '3%',
          // shadowOffset: { width: 0, height: 3, },
          // shadowColor: 'gray',
          // shadowOpacity: 1.0,
          elevation: 8,
     }
});
const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(TaskList);


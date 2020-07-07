import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { ScrollView } from 'react-native-gesture-handler';
import { serverURI } from '../../global.js';

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
               userID: this.props.userID,
               refreshing: false,
          }
     }
     _getData = () => {
          this.setState({ spinner: !this.state.spinner })
          this.setState({ refreshing: !this.state.refreshing })
          axios.get(serverURI + '/getContactList/' + this.props.userLogged)
               .then(response => {
                    //const persons = res.data;
                    this.setState({ persons: response.data.contactList });
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
                    <ScrollView
                         refreshControl={
                              <RefreshControl
                                   refreshing={this.state.refreshing}
                                   onRefresh={this._onRefresh}
                              />
                         }
                    >
                         {this.state.persons.map((person, i) =>
                              <AllContactCard personprop={person} userID={this.props.userLogged} />
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
          backgroundColor: '#EFF1F5',
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
          elevation: 8,
     }
});
const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(ContactList);


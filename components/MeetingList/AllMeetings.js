import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ActivityIndicator, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl,Alert } from 'react-native';
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
class AllMeetings extends Component {
     constructor(props) {
          super(props)
          this.state = {
               persons: [],
               visible: false,
               refreshing: false,
               spinner: false,
               userID: this.props.userID,
               refreshList: false
          }
     }

     _getData = () => {
          this.setState({ spinner: !this.state.spinner })
          this.setState({ refreshing: !this.state.refreshing })
          axios.get(serverURI + '/getOpenMeetings/' + this.props.userLogged)
               .then(response => {
                    //const persons = res.data;
                    this.setState({ persons: response.data });
                    this.setState({ refreshing: !this.state.refreshing })
                    this.setState({ spinner: !this.state.spinner })
               })
               .catch(function (error) {
                    console.log(error);

               })
          this.setState({refreshList:false})
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
                    <ScrollView
                         refreshControl={
                              <RefreshControl
                                   refreshing={this.state.refreshing}
                                   onRefresh={this._onRefresh}
                              />}>
                         {this.state.persons.map((person, i) =>
                              
                              <AllMeetingsCard meeting={person} editMode={this.props.editMode} key={i} />
                              

                         )}
                    </ScrollView>
               </View>
          );
     }
}

const styles = StyleSheet.create({
     container0: {
          flex: 1,
          backgroundColor: '#EFF1F5',
     },
     spinnerTextStyle: {
          color: '#FFF',
          fontSize: 14,
     },

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
const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(AllMeetings);


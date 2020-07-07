import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Dimensions, RefreshControl } from 'react-native';
import { Provider, Portal, Dialog, Card, Appbar, Paragraph, Button, Colors, DefaultTheme, ThemeProvider } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { serverURI } from '../../global.js';
import { connect } from 'react-redux';

import { FlatList, ScrollView } from 'react-native-gesture-handler';
class AcceptedMeetings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            visible: false,
            spinner: false,
            userID: this.props.userID,

        }
    }

    _getData = () => {
        this.setState({ spinner: !this.state.spinner })

        axios.get(serverURI + '/getMeetingAcceptedList/' + this.props.userLogged)
            .then(response => {
                //const persons = res.data;
                this.setState({ persons: response.data });
                this.setState({ refreshing: false });
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

                                   }}>No Accepted Meetings
                                   </Text> :
                              <Text
                                   style={{
                                        display: 'none'
                                 }} />}
                       
                    {this.state.persons.reverse().map((person, i) =>
                       <Card style={styles.cardBox}  >
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
                                    // backgroundColor:'orange'
                                 }}>
                                 <Icon2 name="user-circle-o" color="#2D3E52" size={70} />
                            </View>
                            <View
                                 style={{
                                   width: '66%',
                                   justifyContent: 'center',
                                   alignItems: 'flex-start',
                                   // backgroundColor: 'pink'
                                 }}>
                                 <Text
                                      style={{
                                           color: person.taskType === 'meeting' ? '#E78E00' : '#7A00F4',
                                           fontSize: 12,
                                           // paddingLeft: 10,
                                      }}>
                                     NAME
                                 </Text>

                                 <Text
                                      style={{
                                           fontSize: 18,
                                           color: '#4A4A4A',
                                           // paddingLeft: 10
                                      }}>
                                      {person.memberName}
                                     </Text>
                                     <Text
                                      style={{
                                           fontSize: 14,
                                           color: '#4A4A4A',
                                           // paddingLeft: 10
                                      }}>
                                      {person.memberId}
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
        backgroundColor: '#EFF1F5',
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 14,
    },
    cardBox: {
     // alignSelf: 'center',
     // width: '95%',
     // borderRadius: 4,
     // marginTop: 9,
     // marginBottom:3,
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
    }
});
const mapStateToProps = state => {
    return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(AcceptedMeetings);


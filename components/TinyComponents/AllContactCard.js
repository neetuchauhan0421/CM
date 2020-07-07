import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, TouchableOpacity, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { Button, Card, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider, Appbar } from 'react-native-paper';
import OptionsMenuContactCard from './OptionsMenuContactCard.js';
export default class ContactCard extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userID: this.props.userID,
          }
     }

     render() {
          memb = {
               userID: this.state.userID,
               memberId: this.props.personprop.memberId,
               contactId: this.props.personprop.contactId,
               memberName: this.props.personprop.memberName,
               memberLocation: this.props.personprop.memberLocation,
               membershipDate: this.props.personprop.membershipDate,
               memberAbout: this.props.personprop.memberAbout,
          }
          return (
               <Card style={styles.cardBox}>
                         <OptionsMenuContactCard style={{ alignSelf: 'flex-end', position: 'absolute' }} navigation={this.props.navigation} mem={memb} ></OptionsMenuContactCard>
                    <View>
                         <Text style={{ fontSize: 21 }}>
                              <Icon name="md-person" color="#8320F4" size={20} />
                              {'   '}{this.props.personprop.memberName}
                         </Text>
                         {/* <Text>{this.props.personprop.memberId}</Text> */}
                         {/* <Text>{this.props.personprop.contactId}</Text> */}
                         <Text>{this.props.personprop.memberAbout}</Text>
                         <Text style={{ display: this.props.personprop.memberEmail ? 'flex' : 'none' }}>
                              <Icon name="md-mail" color="#8320F4" size={20} />
                              {'   '}{this.props.personprop.memberEmail}
                         </Text>
                         <Text style={{ display: this.props.personprop.memberPhonenumber ? 'flex' : 'none' }}>
                              <Icon2 name="phone" color="#8320F4" size={20} />
                              {'   '}{this.props.personprop.memberPhonenumber}
                         </Text>
                         {/* <Text style={{ display: this.props.personprop.setmeetingflag ? 'flex' : 'none' }}>
                    {this.props.personprop.setmeetingflag}
                </Text> */}
                         <Text style={{ display: this.props.personprop.membershipDate ? 'flex' : 'none' }}>
                              {this.props.personprop.membershipDate}
                         </Text>
                         <Text style={{ display: this.props.personprop.memberDetails ? 'flex' : 'none' }}>
                              {this.props.personprop.memberDetails}
                         </Text>
                    </View>
               </Card>
          );
     }
}

const styles = StyleSheet.create({
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

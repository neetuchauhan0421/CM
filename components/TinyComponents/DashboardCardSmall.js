import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Card, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
export default class DashboardCardSmall extends Component {
     constructor(props) {
          super(props);
          this.state = {
          }
     }

     render() {

          return (

               <Card style={styles.cardBox}  >
                    <Text
                         style={{
                              color: this.props.personProp.taskType === 'meeting' ? '#E78E00' : '#7A00F4',
                              fontSize: 16,
                              // textTransform: 'uppercase'
                         }}>
                         {this.props.personProp.taskType}

                    </Text>

                    <Text style={{ fontSize: 18, color:'#4A4A4A' }}>{this.props.personProp.memberName}</Text>

               </Card>
          );
     }
}

const styles = StyleSheet.create({
     container0: {
          flex: 1,
         
     },
     cardBox: {
          alignSelf: 'center',
          width: '90%',
          borderRadius: 4,
          marginTop: 10,
          //marginBottom: 15,
          flex: 0,
          padding: '1%',
height:60,
          elevation: 2,
     },
});

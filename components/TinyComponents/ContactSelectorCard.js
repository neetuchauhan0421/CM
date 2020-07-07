import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert } from 'react-native';
import { Button, Card, Provider as PaperProvider, TextInput, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import OptionsMenu from './OptionsMenuContactCard.js';
export default class ContactCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: this.props.userID,
        }
    }

    cardClick() {

        this.props.navigation.navigate('NewMeetingRequest', {
            userID: this.state.userID,
            memberId: this.props.person.memberId,
            contactId: this.props.person.contactId,
            memberName: this.props.person.memberName,
            memberLocation: this.props.person.memberLocation,
            membershipDate: this.props.person.membershipDate,
            memberAbout: this.props.person.memberAbout,
        }
        )
    }
    render() {

        return (
            <View>
                <Card style={styles.cardBox} onPress={_ => this.cardClick()} >
                    <Text style={{ fontSize: 18 }}>{this.props.person.memberName}</Text>
                    <Text style={{ color: 'grey' }}>
                        {this.props.person.memberId}{'\n'}
                        {/* {this.props.person.contactId}{'\n'} */}
                        
                        {this.props.person.memberAbout}{'\n'}
                        {this.props.person.memberLocation}{'\n'}
                        {this.props.person.memberEmail}{'\n'}

                        {/* {this.props.person.memberPhonenumber}{'\n'} */}

                        {this.props.person.membershipDate}
                    </Text>
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container0: {
        flex: 1,
        // justifyContent: 'flex-start',
        // backgroundColor: '#EFF1F5',
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
    },
});

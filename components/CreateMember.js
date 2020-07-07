import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button, Provider as PaperProvider , Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
export default class CreateMember extends Component {

    render() {
        return (
            <View style={styles.container0}>

                <View style={{ flexDirection: 'row' }}>
                    <Text>UserID:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:14}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>User Name:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Joined Date:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Organisation:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>User Type:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Country:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Number:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>E-mail:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Social:</Text>
                    <TextInput style={{width: '20%', backgroundColor: 'white',fontSize:24}} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container0: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        // justifyContent: 'flex-start',
        backgroundColor: '#EFF1F5',
    },

    input0: {
        width: '90%',
        backgroundColor: 'white',
    }

});

import React, { Component } from 'react';
import { Platform, TouchableOpacity, StyleSheet, Text, View, Image, Linking, KeyboardAvoidingView, Alert, ScrollView, TextInput as TextInput2 } from 'react-native';
import { Appbar, Card, Switch, Button, TextInput, Provider as PaperProvider, Colors, DefaultTheme, Checkbox, ThemeProvider } from 'react-native-paper';
import axios from 'axios';
// import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { serverURI } from '../global';
import { connect } from 'react-redux';

class EditPrifileNewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: [],

            userID: this.props.userLogged,
            s_MemDateFlag: false,
            s_Location: false,
            s_Phone: false,
            s_Email: false,
            s_Social: false,
            s_setMeetings: false,

            MemDateFlag: '',
            Location: '',
            Phone: '',
            Email: '',
            Social: '',
            setMeetings: '',

            spinner: false,
            taskId: '',
            memberName: '',
            memberShortBio: '',
            membershipDate: '',
            aboutMember: '',
            memberLoc: '',
            memberContactNum: '',
            memberEmail: '',
            memberSocialAcc: '',

        }
    }

    componentDidMount() {
        axios.post(serverURI + '/memberRequest/' + this.props.userLogged)
            .then(response => {
                this.setState({ profileData: response.data })
                this.setState({
                    memberName: response.data.memberName,
                    memberShortBio: response.data.memberShortBio,
                    membershipDate: response.data.membershipDate,
                    aboutMember: response.data.aboutMember,
                    memberLoc: response.data.memberLoc,
                    memberContactNum: response.data.memberContactNum,
                    memberEmail: response.data.memberEmail,
                    memberSocialAcc: response.data.memberSocialAcc,
                })

                // ---- MEMDATE
                if (response.data.defaultMemDateFlag === 'y') {
                    this.setState({ s_MemDateFlag: true })
                }
                if (response.data.defaultMemDateFlag === 'n') {
                    this.setState({ s_MemDateFlag: false })
                }

                // ---- LOCATION
                if (response.data.defaultLocationFlag === 'y') {
                    this.setState({ s_Location: true })
                }
                if (response.data.defaultLocationFlag === 'n') {
                    this.setState({ s_Location: false })
                }

                // ---- PHONE
                if (response.data.defaultPhoneFlag === 'y') {
                    this.setState({ s_Phone: true })
                }
                if (response.data.defaultPhoneFlag === 'n') {
                    this.setState({ s_Phone: false })
                }

                // ---- EMAIL
                if (response.data.defaultEmailFlag === 'y') {
                    this.setState({ s_Email: true })
                }
                if (response.data.defaultEmailFlag === 'n') {
                    this.setState({ s_Email: false })
                }

                // ---- SOCIAL
                if (response.data.defaultSocialFlag === 'y') {
                    this.setState({ s_Social: true })
                }
                if (response.data.defaultSocialFlag === 'n') {
                    this.setState({ s_Social: false })
                }

                // ---- MEETINGS
                if (response.data.setMeetings === 'y') {
                    this.setState({ s_setMeetings: true })
                }
                if (response.data.setMeetings === 'n') {
                    this.setState({ s_setMeetings: false })
                }

            })
    }



    editButtonClick = () => {
        if (this.state.memberName === '') {
            Alert.alert("Please enter the Mandatory fields.")
        }
        else {
            var details = {
                userId: this.props.userLogged,
                membername: this.state.memberName,
                membershipdate: this.state.membershipDate,
                memberabout: this.state.aboutMember,
                membershortbio: this.state.memberShortBio,
                memberlocation: this.state.memberLoc,
                memberphonenumber: this.state.memberContactNum,
                memberemail: this.props.userLogged,
                membersocialaccount: this.state.memberSocialAcc,
                sharingdefaultmemdate: this.state.s_MemDateFlag ? "y" : "n",
                sharingdefaultemail: this.state.s_Email ? "y" : "n",
                sharingdefaultphone: this.state.s_Phone ? "y" : "n",
                sharingdefaultsocialacc: this.state.s_Social ? "y" : "n",
                sharingdefaultlocation: this.state.s_Location ? "y" : "n",
                sharingdefaultsetmeetings: this.state.s_setMeetings ? "y" : "n",
                createdby: 'admin',
                //creationdate:this.state.memberEmail,
                lastupdatedby: '01/01/2019',
                lastupdatedate: '01/01/2019',
                imageurl: 'imgur.com',
                isdeleted: 'n',

            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            console.log('Before response @' + formBody)
            fetch(serverURI + '/writeMember/' + this.props.userLogged, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            })
                .then(response => {
                    response.json()
                    console.log('response @:' + JSON.stringify(response))
                });

            this.props.navigation.navigate("NewContactRequest")
            Alert.alert('Profile is Edited!')
        }
    }





    render() {

        return (
            <View style={{ backgroundColor: '#F2F4F8', height: '100%' }}>
                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                {/* ?--------------     APPBAR      ---------------- */}
                <Appbar.Header style={{ backgroundColor: 'white' }}>
                    <Appbar.Content
                        title="Profile"
                        subtitle="Edit your Profile."
                    />
                    {/* <TouchableOpacity>
                        <Text onPress={() => this.props.navigation.navigate("BottomNavigator")} style={{ marginRight: '3%' }}>Dashboard</Text>
                    </TouchableOpacity> */}
                </Appbar.Header>

                <ScrollView contentContainerStyle={{
                    flexGrow: 1,
                }}>


                    {/* ---------------     name     --------------- */}
                    <View style={styles.profileA}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 16 }}>User Name*:</Text>
                            <TextInput
                                style={styles.usernameinput}
                                //numberOfLines={4}
                                flexWrap={'wrap'}
                                onChangeText={(memberName) => this.setState({ memberName })}
                                value={this.state.memberName}
                                padding={0}
                            />
                        </View>


                        {/* ---------------     short bio     --------------- */}
                        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                            <Text style={{ fontSize: 16 }}>Short{'\n'} Bio{'\n'} {this.props.navigation.getParam('taskID', 'NO_userID')}</Text>
                            <TextInput style={styles.shortbio}
                                {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                                editable={true}
                                // maxLength={40}
                                multiline={true}
                                onChangeText={(memberShortBio) => this.setState({ memberShortBio })}
                            >
                                {this.state.memberShortBio}
                            </TextInput>
                        </View>

                        {/* ---------------     ABOUT     --------------- */}
                        <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                            <Text style={{ fontSize: 16, marginTop: '5%' }}>About</Text>
                            <TextInput
                                style={styles.AboutInput}
                                placeholder={this.state.aboutMember}
                                multiline={true}
                                textAlignVertical={'top'}
                                numberOfLines={4}
                                onChangeText={(aboutMember) => this.setState({ aboutMember })}
                                value={this.state.aboutMember}
                            />
                        </View>


                        {/* ---------------     member since     --------------- */}
                        <View style={styles.shares}>
                            <Text style={{ fontSize: 16, marginTop: '3%' }}>Member Since</Text>
                            <Text style={{ marginTop: '4%', marginLeft: '5%' }}>{this.state.membershipDate}</Text>

                            <Switch
                                value={this.state.s_MemDateFlag}
                                onValueChange={() => {
                                    this.setState({ s_MemDateFlag: !this.state.s_MemDateFlag });
                                    // this.setState({ s_MemDateFlag: this.setState({ MemDateFlag: 'y' }) });

                                }}
                                style={{ marginTop: '2%', position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                            />
                        </View>



                        <View style={styles.shares}>

                            <Icon2 name="home" color="#8320F4" size={20} />
                            <TextInput2 style={styles.shareText}
                                onChangeText={(memberLoc) => this.setState({ memberLoc })}
                            >{this.state.memberLoc}</TextInput2>
                            <Switch
                                value={this.state.s_Location}
                                onValueChange={() => {
                                    this.setState({ s_Location: !this.state.s_Location });
                                }}
                                style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>



                        <View style={styles.shares}>
                            <Icon2 name="phone" color="#8320F4" size={20} />
                            <TextInput2 style={styles.shareText}
                                onChangeText={(memberContactNum) => this.setState({ memberContactNum })}
                            >{this.state.memberContactNum}</TextInput2>
                            <Switch
                                value={this.state.s_Phone}
                                onValueChange={() => {
                                    this.setState({ s_Phone: !this.state.s_Phone });
                                }}
                                style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>


                        <View style={styles.shares}>
                            <Icon name="md-mail" color="#8320F4" size={20} />
                            <Text style={{ margin: 5 }}>{this.state.memberEmail}</Text>
                            <Switch
                                value={this.state.s_Email}
                                onValueChange={() => {
                                    this.setState({ s_Email: !this.state.s_Email });
                                }}
                                style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>


                        <View style={styles.shares}>
                            <Icon2 name="hashtag" color="#8320F4" size={20} />
                            <TextInput2 style={styles.shareText}
                                onChangeText={(memberSocialAcc) => this.setState({ memberSocialAcc })}
                            >{this.state.memberSocialAcc}</TextInput2>
                            <Switch
                                value={this.state.s_Social}
                                onValueChange={() => {
                                    this.setState({ s_Social: !this.state.s_Social });
                                }}
                                style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>


                        <View style={styles.shares}>
                            <Text style={{ margin: 5 }}>Setup Meetings with you.</Text>
                            <Switch
                                value={this.state.s_setMeetings}
                                onValueChange={() => {
                                    this.setState({ s_setMeetings: !this.state.s_setMeetings });
                                }}
                                style={{ position: 'absolute', right: '0.5%', transform: [{ scaleX: .8 }, { scaleY: .8 }] }} />
                        </View>



                    </View>



                </ScrollView>
                <Button mode="contained" onPress={() => this.editButtonClick()} style={styles.sharebutton}>
                    Edit
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container0: {
        flex: 1,
        alignItems: 'center',

    },
    usernameinput: {
        width: '75%',
        height: 40,
        fontSize: 12,
        backgroundColor: 'white',
        //   marginTop: '5%',
        // marginLeft: '5%',
        //  padding: '2%',
        //elevation: 2,
    },
    shortbio: {
        width: '75%',
        height: 100,
        fontSize: 14,
        backgroundColor: 'white',
        // numberOfLines:'5',
    },
    AboutInput: {
        width: '75%',
        height: 40,
        fontSize: 14,
        backgroundColor: 'white',
        marginLeft: 35,
        //   marginTop: '5%',
        // marginLeft: '5%',
        //  padding: '2%',
        //elevation: 2,
    },
    spinnerTextStyle: {
        color: '#FFF',
        fontSize: 14,
    },
    shareText: {
        margin: 5,
        backgroundColor: '#FFF',
        padding: 0,
        width: '75%',
    },

    profileA: {
        padding: 15,
        marginTop: '2%',
        paddingBottom: 30,
        width: '95%',
        flex: 0,
        elevation: 3,
        backgroundColor: '#F2F4F8'
    },

    profileB: {
        padding: '4%',
        marginTop: '5%',
        width: '90%',
        flex: 0,
        elevation: 3,
    },

    profileC: {
        padding: '3%',
        marginTop: '5%',
        width: '90%',
        flex: 0,
        elevation: 3,
    },
    shares: {
        flexDirection: 'row',
        flex: 0,
        marginTop: '2.5%',
    },

    profileD: {
        paddingTop: '2%',
        paddingBottom: '5%',
        marginTop: '5%',
        width: '90%',
        flex: 0,
        elevation: 3,
        alignSelf: 'center',
    },
    sharebutton: {
        backgroundColor: '#89CE3A',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        elevation: 8,
    }


});
const mapStateToProps = state => {
    return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(EditPrifileNewUser);

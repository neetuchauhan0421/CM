import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Alert } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Appbar, Portal, Dialog, Paragraph, Button, Provider } from 'react-native-paper';
import AllMeetings from './MeetingList/AllMeetings2';
import AcceptedMeetings from './MeetingList/AcceptedMeetings.js';
import DeniedMeetings from './MeetingList/DeniedMeetings.js';
import { connect } from 'react-redux';

const FirstRoute = (props) => (
     <AllMeetings editMode={props.editMode} userID={props.userID} />
);
const SecondRoute = (props) => (
     <AcceptedMeetings userID={props.userID} />
);
const ThirdRoute = (props) => (
     <DeniedMeetings userID={props.userID} />
);

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({ route }) => (
     <View style={styles.scene}>
          <Text>Loading {route.title}…</Text>
     </View>
);

class Meetings extends React.Component {
     state = {
          index: 0,
          routes: [
               { key: 'first', title: 'All' },
               { key: 'second', title: 'Accepted' },
               { key: 'third', title: 'Denied' },
          ],
          // The loaded array will contain the list of routes we have loaded
          loaded: ['first'],

          editMode: 'Edit',
          userID: this.props.userLogged,//this.props.userID,
     };

     _handleIndexChange = index =>
          this.setState(state => {
               const { key } = state.routes[index];

               return {
                    index,
                    // If the route isn't loaded already, add it's key to the loaded list
                    // This way routes will be loaded as we navigate to them
                    loaded: state.loaded.includes(key)
                         ? state.loaded
                         : [...state.loaded, key],
               };
          });
     _renderTabBar = props => {
          const inputRange = props.navigationState.routes.map((x, i) => i);

          return (
               <View >
                    <TabBar
                         {...props}
                         style={styles.tabbar}
                         indicatorStyle={{ backgroundColor: 'white' }}
                    />

               </View>
          );
     };
     _renderScene = ({ route }) => {
          if (
               this.state.routes.indexOf(route) !== this.state.index &&
               !this.state.loaded.includes(route.key)
          ) {
               // If the route is not focused and not loaded, render a placeholder
               return <LazyPlaceholder route={route} />;
          }

          switch (route.key) {
               case 'first':
                    return <FirstRoute editMode={this.state.editMode} userID={this.state.userID} />;
               case 'second':
                    return <SecondRoute userID={this.state.userID} />;
               case 'third':
                    return <ThirdRoute userID={this.state.userID} />;
               default:
                    return null;
          }
     };
     editClick = () => {
          this.state.editMode === 'Edit'
               ?
               this.setState({ editMode: 'Done' })
               :
               this.setState({ editMode: 'Edit' })
     }
     
     render() {
          return (
               <View style={{ flex: 1 }}>
                    {/* ?--------------     APPBAR      ---------------- */}
                    <Appbar.Header style={{ backgroundColor: '#000000', marginLeft: 2, elevation: 0 }}>

                         <Appbar.Content
                              title={<Text style={{ color: 'white' }}>Meetings</Text>}

                         //   alignItems="flex-end"
                         />
                         {/* <Appbar.Action icon="search" onPress={this._onSearch} /> */}
                         {/* <Appbar.Action icon={"more-vert"} onPress={this._showDialog} /> */}
                         <TouchableOpacity>
                              <Text onPress={this.editClick} style={{ marginRight: '3%', color: 'white', fontSize: 16 }}>{this.state.editMode}</Text>
                         </TouchableOpacity>
                    </Appbar.Header>
                    <TabView
                         swipeEnabled={false}
                         navigationState={this.state}
                         renderScene={this._renderScene}
                         renderTabBar={this._renderTabBar}
                         onIndexChange={this._handleIndexChange}
                         initialLayout={{ width: Dimensions.get('window').width }}

                    />
               </View>
          );
     }
}

const styles = StyleSheet.create({
     scene: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#23D3C4',
     },
     tabBar: {
          flexDirection: 'row',
          backgroundColor: '#F6931D',
          height: 40,

          elevation: 4,

     },
     tabItem: {
          flex: 1,
          alignItems: 'center',
          padding: '3%',
     },
     tabbar: {
          backgroundColor: '#000000',
     },
});

const mapStateToProps = state => {
     return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(Meetings);


import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Appbar, Portal, Dialog, Paragraph, Button, Provider } from 'react-native-paper';
import AllContacts from './ContactList/AllContacts2.js';
import AcceptedContacts from './ContactList/AcceptedContacts.js';
import DeniedContacts from './ContactList/DeniedContacts.js';
import { connect } from 'react-redux';

{/* ?--------------         ROUTES      ---------------- */ }
const FirstRoute = (props) => (
     <AllContacts userID={props.userID} />
);
const SecondRoute = (props) => (
     <AcceptedContacts userID={props.userID} />
);
const ThirdRoute = (props) => (
     <DeniedContacts userID={props.userID} />
);

// This is our placeholder component for the tabs
// This will be rendered when a tab isn't loaded yet
// You could also customize it to render different content depending on the route
const LazyPlaceholder = ({ route }) => (
     <View style={styles.scene}>
          <Text>Loading {route.title}…</Text>
     </View>
);

class Contacts extends React.Component {
     state = {
          index: 0,
          routes: [
               { key: 'first', title: 'All' },
               { key: 'second', title: 'Accepted' },
               { key: 'third', title: 'Denied' },
          ],
          // The loaded array will contain the list of routes we have loaded
          loaded: ['first'],
          userID: this.props.userLogged,// this.props.userID,
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
                    {/* --------------      TABS       ------------------- */}
                    {/* <View style={styles.tabBar}>
                        {props.navigationState.routes.map((route, i) => {
                            const color = props.position.interpolate({
                                inputRange,
                                outputRange: inputRange.map(
                                    inputIndex => (inputIndex === i ? '#FFFFFF' : '#222')
                                ),
                            });
                            return (
                                <TouchableOpacity
                                    style={styles.tabItem}
                                    onPress={() => this.setState({ index: i })}>
                                    <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View> */}
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
                    return <FirstRoute userID={this.state.userID} />;
               case 'second':
                    return <SecondRoute userID={this.state.userID} />;
               case 'third':
                    return <ThirdRoute userID={this.state.userID} />;
               default:
                    return null;
          }
     };

     render() {
          return (
               <View style={{ flex: 1 }}>
                    {/* ?--------------     APPBAR      ---------------- */}
                    <Appbar.Header style={{ backgroundColor: '#000000',  marginLeft: 2, elevation: 0 }}>
                         
                         <Appbar.Content
                              title={<Text style={{ color: 'white' }}>Contacts</Text>}
                         />
                        
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
          elevation: 2,
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

export default connect(mapStateToProps)(Contacts);


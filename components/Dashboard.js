import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Alert, StatusBar } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Appbar, Portal, Dialog, Paragraph, Button, Provider } from 'react-native-paper';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import SignIn from './SignIn.js';
import OptionsMenu from './TinyComponents/OptionsMenuDashboard.js';
import TaskList from './Task/TaskList2.js';
import AcceptedTaskList from './Task/AcceptedTaskList.js';
import { userIDLoggedin } from '../global.js';
import { connect } from 'react-redux';
import DeniedTaskList from './Task/DeniedTaskList.js';
import { COLORS } from '../state/Colors';
{/* ?--------------         ROUTES      ---------------- */ }
const FirstRoute = (props, nav) => (
     <TaskList switchtab='0' userID={props.userID} navigation={nav.navigation} />
);
const SecondRoute = (props) => (
     <AcceptedTaskList userID={props.userID} />
);
const ThirdRoute = (props) => (
     <DeniedTaskList userID={props.userID} />
);

const LazyPlaceholder = ({ route }) => (
     <View style={styles.scene}>
          <Text>Loading {route.title}…</Text>
     </View>
);
// const MyStatusBar = ({backgroundColor, ...props}) => (
//      <View style={[styles.statusBar, { backgroundColor }]}>
//        <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//      </View>
//    );
class Dashboard extends React.Component {
     state = {
          userID: this.props.userLogged,//this.props.userID,
          index: 0,
          routes: [
               { key: 'first', title: 'All' },
               { key: 'second', title: 'Accepted' },
               { key: 'third', title: 'Denied' },
          ],
          // The loaded array will contain the list of routes we have loaded
          loaded: ['first'],
     };
     _menu = null;

     setMenuRef = ref => {
          this._menu = ref;
     };

     hideMenu = () => {
          this._menu.hide();
     };

     showMenu = () => {
          this._menu.show();
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
               <View  >
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
                    return <FirstRoute userID={this.props.userLogged} navigation={this.props.navigation} />;
               case 'second':
                    return <SecondRoute userID={this.props.userLogged} />;
               case 'third':
                    return <ThirdRoute userID={this.props.userLogged} />;
               default:
                    return null;
          }
     };

     render() {
          appbar = <Appbar.Action icon="more-vert" onPress={this.showMenu} />
          return (
               <View style={{ flex: 1 }} navigation={this.props.navigation} >
                   
                    <Appbar.Header style={{ backgroundColor: '#000000'}}>

                         <Appbar.Content
                              title={<Text style={{ color: 'white' }}>Dashboard</Text>}
                         />
                         <OptionsMenu app_bar={appbar} navigation={this.props.navigation} color={'white'} />
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
          justifyContent: 'center', color: '#23D3C4',
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

export default connect(mapStateToProps)(Dashboard);


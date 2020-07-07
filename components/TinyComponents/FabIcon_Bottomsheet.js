import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from 'react-native-js-bottom-sheet'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux';

class FAB extends Component {
   constructor(props) {
      super(props);
      this.state = {
         temp: false,

      }
   }
   bottomSheet: BottomSheet

   _onPressButton = () => {
      this.bottomSheet.open()
   }

   render() {
      {
         if (this.state.temp) {
            this.props.navigation.navigate('NewContactRequest')
         }
      }
      contactPress = () => {
         this.bottomSheet.close()
         // { this.props.navigation.navigate('NewContactRequest')}
      }
      return (
         <View style={styles.container}>

            <TouchableOpacity onPress={() => { this.bottomSheet.open() }} style={styles.fab}>
               <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>

            <BottomSheet
               ref={(ref: BottomSheet) => { this.bottomSheet = ref }}
               borderRadius={0}
               itemDivider={2}

               backButtonEnabled={true}
               coverScreen={true}
               title='Create'
               options={[
                  {
                     title: (<Text style={{ fontSize: 16 }}>Create</Text>)
                  },
                  
                  {
                     title: (<Text style={{ fontSize: 16 }}>New Contact</Text>),
                     icon: (
                        <MaterialCommunityIcons name="contact-mail" color="#89CE3A" size={26} />
                     ),
                     onPress: () => {
                        {
                           this.bottomSheet.close()
                           this.props.navigation.navigate('NewContactRequest', { userID: this.props.userLogged })
                        }
                     }
                  },
                  {
                     title: (<Text style={{ fontSize: 16 }}>New Meeting Request</Text>),
                     icon: (
                        <MaterialCommunityIcons name="calendar-clock" color="#89CE3A" size={26} />
                     ),
                     onPress: () => {
                        {
                           this.bottomSheet.close()
                           this.props.navigation.navigate('ContactSelector', { userID: this.props.userLogged })
                        }
                     }
                  },


               ]}
               isOpen={false}
            />

         </View>
      )
   }
}

const styles = StyleSheet.create({


   fab: {
      position: 'absolute',
      width: 70,
      height: 70,
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      // right: '41%',
      // left: '41%',
      bottom: 10,
      backgroundColor: '#89CE3A',
      borderRadius: 40,
      elevation: 8,

   },
   fabIcon: {
      marginBottom: 4,
      fontSize: 40,
      color: 'white'
   }
});

const mapStateToProps = state => {
   return { userLogged: state.userLogged };
};

export default connect(mapStateToProps)(FAB);


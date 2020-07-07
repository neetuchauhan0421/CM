import React from 'react';
import { Animated } from 'react-native';

export default class FadeInView extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       fadeAnim: new Animated.Value(0), // init opacity 0
     };
   }
   componentDidMount() {
     Animated.timing(          // Uses easing functions
       this.state.fadeAnim,    // The value to drive
       {toValue: 1},           // Configuration
     ).start();                // Don't forget start!
   }
   render() {
     return (
       <Animated.View          
         style={{opacity: this.state.fadeAnim, width: 300,
            height: 300,
            backgroundColor:'grey',justifyContent:'center', alignSelf:'center'}}> 
         {this.props.children}
       </Animated.View>
     );
   }
 }


import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native';
import Checkbox from 'react-native-custom-checkbox';
import { TouchableRipple } from 'react-native-paper';


export default class CheckBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            internalChecked: false,
            isDisabled : props.disabled
        };
       
    }

   

    render() {
     
       
      
        return (
           <View style={{marginTop:40}}>
              < TouchableRipple>
              <Checkbox
                style={{backgroundColor: 'white', color:'pink', borderRadius: 5,
                borderWidth: 2, margin: 10, borderColor:'green'}}
                    checked={true} />
              </ TouchableRipple>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    flexContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkbox: {
        width: 26,
        height: 26
    },
    labelContainer: {
        marginLeft: 10,
        marginRight: 10,
    },
    label: {
        fontSize: 15,
        color: 'grey'
    }
});

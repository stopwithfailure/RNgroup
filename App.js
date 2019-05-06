import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    FlatList,
    Dimensions,
    Image,
    Button,
    TextInput,
} from 'react-native';

const { width, height } = Dimensions.get('window');

//To get the year date and time
const Getdate=()=>{
    var date = new Date();
    var year = date.getFullYear().toString();
    var month = (date.getMonth()+1).toString();
    var day = date.getDate().toString();
    var hour =  date.getHours().toString();
    var minute = date.getMinutes().toString();
    return year+'年'+month+'月'+day+'日'+' '+hour+':'+minute;
}

export default class RNProjectTestApp extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View style={{ flex: 0 }}>
                
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    
});
AppRegistry.registerComponent('RNProjectTestApp', () => RNProjectTestApp);
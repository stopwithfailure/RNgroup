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
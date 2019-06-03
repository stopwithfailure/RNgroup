import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

var netdata = [];
var debug_province = [{ "province": "Hebei" }, { "province": "Shandong" }, { "province": "Jiangsu" }];

export default class province extends React.Component {
    static navigationOptions = {
        title: 'WELCOME!',
    };
    constructor(props) {
        super(props);
        this.state = {
            data: netdata = debug_province,//this is the state of user's data
            search: '',
        };
    }
    componentDidMount() {
        fetch(URL + "query=province")
            .then((response) => response.json())        // json
            .then((responseData) => {
                this.setState({
                    data: responseData,//when we use setState,it render again 
                })
                netdata = responseData;
            })
            .catch((error) => {     // handle err 
            })
            .done();
    }
    search_(clue) {
        // Alert.alert(clue)
        if (clue == "") {
            this.setState({
                data: netdata,
                search: '',
            })
        } else {
            let newdata = [];
            for (let i = 0; i < netdata.length; ++i) {
                // Alert.alert(netdata[i]['province'])	;
                if (netdata[i]['province'].toLowerCase().indexOf(clue) != -1) {
                    newdata.push(netdata[i]);
                }
            }
            this.setState({
                data: newdata,
                search: clue,
            })
        }
    }
    headerorfooterComponent = () => {
        return (
            <View style={styles.list}>
                <SearchBar
                    placeholder="Search provices..."
                    onChangeText={(clue) => this.search_(clue)}
                    containerStyle={{ width: win.width - 6, height: 60, backgroundColor: 'white', borderRadius: 11, marginLeft: 3, marginRight: 3, marginTop: 3 }}
                    inputContainerStyle={{ backgroundColor: 'white' }}
                    searchIcon={{ size: 30, color: 'grey' }}
                    inputStyle={{ fontSize: 15 }}
                    placeholderTextColor={'grey'}
                    value={this.state.search}
                />

            </View>
        )
    }
    renderItem(item) {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.list}>
                <TouchableOpacity onPress={() => navigate('city', { value: item.province })}>
                    <Button
                        buttonStyle={{
                            width: win.width - 10,
                            height: 50,
                            backgroundColor: 'white',

                        }}
                        containerStyle={{
                            width: win.width - 10,
                            height: 50,
                            marginTop: 5,
                            marginLeft: 5,
                            marginRight: 5,
                            opacity: 0.8,
                        }}
                        titleStyle={{ color: 'black' }}
                        title={item.province}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    colors={['#dbdcd7', '#dddcd7', '#e2c9cc', '#e7627d', '#b8235a', '#801357', '#3d1635', '#1c1a27']}
                    locations={[0, 0.24, 0.3, 0.46, 0.59, 0.71, 0.84, 1]}
                >
                    <FlatList
                        extraData={this.state}
                        keyExtractor={(item, index) => String(index)}
                        data={this.state.data} // data
                        renderItem={({ item }) => this.renderItem(item)} // row
                        // ItemSeparatorComponent={this.separatorComponent} // separator
                        horizontal={false} // row or column
                        // ListEmptyComponent={this.listEmptyComponent} // show when there is no data
                        numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
                        ListHeaderComponent={this.headerorfooterComponent}
                    />
                    <Text style={{ textAlign: 'center' }}>provinces</Text>
                </LinearGradient>
            </View>
        );
    }

};
const win = Dimensions.get('screen')
const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
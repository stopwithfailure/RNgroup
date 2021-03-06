import React from 'react';
import { FlatList, StyleSheet, View, Dimensions, Easing, Animated, Text, ToastAndroid } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const URL = "http://245786ka89.zicp.vip/api/api.php?";
// const URL = "http://10.12.33.161/api/api.php?";
var netdata = [];
// var debug_province = [{ "province": "Hebei" }, { "province": "Shandong" }, { "province": "Jiangsu" }];
var debug_province = [];
export default class province extends React.Component {
    static navigationOptions = {
        headerTitle: (
            <View style={{flex:1}}>
            <Text style={{textAlign: 'center', color:'black',fontWeight:'bold',fontSize:17}}>Scenic spots</Text>
            </View>
        ),
        headerStyle:{
        backgroundColor:'white',
        },
    };
    constructor(props) {
        super(props);
        this.state = {
            rotateVal: new Animated.Value(0),
            ani: 1,
            data: netdata = debug_province,//this is the state of user's data
            search: '',
        };
    }
    componentDidMount() {
        let tt=setTimeout(() => {
            Animated.loop(animationLoading).stop();
            ToastAndroid.showWithGravity(
                'Network connection is unavailable.\nPlease try again later.',
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
                );
        }, 10000);
        const animationLoading = Animated.timing(
            this.state.rotateVal,
            {
                toValue: 360,
                easing: Easing.linear,
            }
        );
        Animated.loop(animationLoading).start();
        fetch(URL + "query=province")
            .then((response) => response.json())        // json
            .then((responseData) => {
                clearTimeout(tt);
                Animated.loop(animationLoading).stop();
                this.setState({
                    data: responseData,//when we use setState,it render again 
                    ani: 0,
                })
                netdata = responseData;
            })
            .catch((error) => {     // handle err 
            })
            .done();
    }
    search_(clue) {
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
                            flex:1,
                            height: 70,
                            backgroundColor: 'white',
                        }}
                        containerStyle={{
                            flex:1,
                            height: 70,
                            marginTop: 5,
                            marginLeft: 5,
                            marginRight: 5,
                            opacity: 0.7,
                        }}
                        titleStyle={{color: 'black',fontSize:17 }}
                        title={item.province}
                    />
                </TouchableOpacity>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    this.state.ani == 1 ?
                        <View>
                            <Animated.Text
                                style={{
                                    textAlign: 'center',
                                    fontSize: 25,
                                    fontFamily: 'iconfont',
                                    transform: [{ 
                                        rotate: this.state.rotateVal.interpolate({
                                            inputRange: [0, 360],
                                            outputRange: ['0deg', '360deg'],
                                        })
                                    }]
                                }}>
                                {/* {'\ue6ae'} */}
                                {'☯'}
                            </Animated.Text>
                            <Text>Loading...</Text>
                        </View>
                        :
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={['#e0ffff',  '#1e90ff']}
                            locations={[0,1]}
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
                            /></LinearGradient>
                }
            </View>
        );
    }
};
const win = Dimensions.get('screen')
const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 1,
        flexDirection:'column',
    },
})
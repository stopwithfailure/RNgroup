import React from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Easing, Animated, } from 'react-native';
import { Card, Button } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const URL = "http://245786ka89.zicp.vip/api/api.php?";
// const URL = "http://10.12.33.161/api/api.php?";
var netdata_d = [];
// var debug_details = [{ "spot_name": "Grassland Tianlu", "img_uri": "http://10.12.33.161/api/image/Grassland Tianlu.jpg", "introduction": "Grassland Tianlu, located in Zhangbei County, Zhangjiakou City, Hebei Province, is an important passageway connecting Chongli County's Saiwai Scenic Area and Zhangbei Grassland Style Area. It is also one of the ten most beautiful highways in mainland China." }, { "spot_name": "Zhangbei Grassland", "img_uri": "http://10.12.33.161/api/image/Zhangbei Grassland.jpg", "introduction": "Zhangbei grassland is located in Zhangbei County, 70 kilometers northwest of Zhangjiakou, with a total area of more than Two hundred square kilometers. It consists of two grasslands, Zhongdu and Guli. The average elevation is one thousand and four hundred meters and the average temperature in summer is Seventeen Point Four degrees. It is suitable for summer and summer." }, { "spot_name": "Luanhe Verve Scenic Spot", "img_uri": "http://10.12.33.161/api/image/Luanhe Verve Scenic Spot.jpg", "introduction": "Luanhe Shenyun Scenic Spot to Foshan Wetland Landscape Appreciation and Experience Area is a scenic spot which integrates wetland culture, wetland scenery and temple appreciation. Luanhe Shenyun Scenic Spot to Foshan Wetland Landscape Experience Zone is located in Lightning River National Wetland Park, Bashang, Hebei Province, Eighteen point eight kilometers away from Pingdingbao Town, Guyuan County Town, covering an area of Five hundred and sixty-two point four hectares." }, { "spot_name": "Territory Gate", "img_uri": "http://10.12.33.161/api/image/Territory Gate.jpg", "introduction": "Dajimen, provincial key cultural relics protection. Located at the northern end of Zhangjiakou City, between the eastern and Western Taiping Mountains towering into the clouds, there is a well-known Great Wall Pass, which has always been a place for military strategists to contend for." }, { "spot_name": "Warm Spring Ancient Town", "img_uri": "http://10.12.33.161/api/image/Warm Spring Ancient Town.jpg", "introduction": "Located in the west of Yuxian County, Hebei Province, Nuanquan Ancient Town is a famous historical and cultural town in China. It is now a national AAA-level tourist attraction. Ancient town is named `warm spring` because of its hot spring water all the year round. The ancient town has a long history and is famous for its springs, fairs, ancient buildings and folk culture." }];
var debug_details = [];
export default class details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rotateVal: new Animated.Value(0),
            ani: 1,
            data: netdata_d = this.Briefinform(debug_details),//this is the state of user's data
        };
    }
    static navigationOptions = ({ navigation, navigationOptions }) => {
        return {
            title: navigation.getParam('province_1') + " > " + navigation.getParam('city_1'),
        }
    };
    componentDidMount() {
        const animationLoading = Animated.timing(
            this.state.rotateVal,
            {
                toValue: 360,
                easing: Easing.linear,
            }
        );
        Animated.loop(animationLoading).start();
        fetch(URL + "query=scenic_spot&" + "province="
            + this.props.navigation.state.params.province_1 + "&city="
            + this.props.navigation.state.params.city_1)
            .then((response) => response.json())        // json
            .then((responseData) => {
                Animated.loop(animationLoading).stop();
                netdata_d = this.Briefinform(responseData);
                this.setState({
                    data: netdata_d,//when we use setState,it render again
                    ani: 0,
                })
            })
            .catch((error) => {     // handle err 
            })
            .done();
    }

    Tobrif(strings) {
        let a = "";
        if (strings.length > 80) {
            for (let i = 0; i < 80; i++) {
                a = a + strings[i];
            }
            a = a + '...';
            return a;
        } else {
            return strings;
        }
    }
    Briefinform(responseData) {
        for (let i = 0; i < responseData.length; i++) {
            responseData[i]['briefinformation'] = this.Tobrif(responseData[i]['introduction']);
            responseData[i]['Select'] = 1;
            responseData[i]['index'] = i;
        }
        return responseData;
    }
    Handleselect(index) {
        let newdata = netdata_d;
        if (newdata[index]['Select'] == 1) {
            newdata[index]['Select'] = -1
        } else {
            newdata[index]['Select'] = 1
        }
        this.setState({
            data: newdata,
        })
    }
    renderItem(item) {
        return (
            <View style={styles.list}>
                <Card
                    title={item.spot_name}
                    image={source = { uri: item.img_uri }}
                >
                    {item.Select == -1 ?
                        <View>
                            <Text style={{ marginBottom: 10 }}>
                                {item.introduction}
                            </Text><Button
                                onPress={() => this.Handleselect(item.index)}
                                backgroundColor='#03A9F4'
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='Close' />
                        </View>
                        :
                        <View>
                            <Text style={{ marginBottom: 10 }}>
                                {item.briefinformation}
                            </Text><Button
                                onPress={() => this.Handleselect(item.index)}
                                backgroundColor='#03A9F4'
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='Learn More' />
                        </View>
                    }

                </Card>
            </View>
        );
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    this.state.ani == 1 ?

                        <Animated.Text
                            style={{
                                textAlign: 'center',
                                fontSize: 34,
                                fontFamily: 'iconfont',
                                transform: [{
                                    rotate: this.state.rotateVal.interpolate({
                                        inputRange: [0, 360],
                                        outputRange: ['0deg', '360deg'],
                                    })
                                }]
                            }}>
                            {'☯'}
                        </Animated.Text> :
                        <LinearGradient
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            colors={['#83a4d4', '#b6fbff']}
                            locations={[0, 1]}
                        ><FlatList
                                extraData={this.state}
                                keyExtractor={(item, index) => String(index)}
                                data={this.state.data} // data
                                renderItem={({ item }) => this.renderItem(item)} // row
                                horizontal={false} // row or column
                                numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
                            />
                        </LinearGradient>
                }

            </View>
        );
    }
}
const win = Dimensions.get('screen')
const styles = StyleSheet.create({
    list: {
        flex: 1,
        margin: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
})
import React, { Component } from 'react';

import {
	FlatList,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	PixelRatio,
	Alert,
} from 'react-native';

import { SearchBar, ListItem, Icon, Card, Button, SocialIcon } from 'react-native-elements';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
// import Ionicons from 'react-native-vector-icons/Ionicons';
const URL = "http://10.12.33.161/api/api.php?";
// const URL="http://245786ka89.zicp.vip/api/api.php?";
// const URL="http://192.168.1.104/api/api.php?";
var netdata = [];
var netdata_c = [];
var debug_province = [{ "province": "Hebei" }, { "province": "Shandong" }, { "province": "Jiangsu" }];
var debug_city = [{ "city": "Zhangjiakou" }, { "city": "Cangzhou" }, { "city": "Baoding" }, { "city": "Handan" }, { "city": "Qinhuangdao" }];
var debug_details = [{ "spot_name": "Grassland Tianlu", "img_uri": "http://10.12.33.161/api/image/Grassland Tianlu.jpg", "introduction": "Grassland Tianlu, located in Zhangbei County, Zhangjiakou City, Hebei Province, is an important passageway connecting Chongli County's Saiwai Scenic Area and Zhangbei Grassland Style Area. It is also one of the ten most beautiful highways in mainland China." }, { "spot_name": "Zhangbei Grassland", "img_uri": "http://10.12.33.161/api/image/Zhangbei Grassland.jpg", "introduction": "Zhangbei grassland is located in Zhangbei County, 70 kilometers northwest of Zhangjiakou, with a total area of more than Two hundred square kilometers. It consists of two grasslands, Zhongdu and Guli. The average elevation is one thousand and four hundred meters and the average temperature in summer is Seventeen Point Four degrees. It is suitable for summer and summer." }, { "spot_name": "Luanhe Verve Scenic Spot", "img_uri": "http://10.12.33.161/api/image/Luanhe Verve Scenic Spot.jpg", "introduction": "Luanhe Shenyun Scenic Spot to Foshan Wetland Landscape Appreciation and Experience Area is a scenic spot which integrates wetland culture, wetland scenery and temple appreciation. Luanhe Shenyun Scenic Spot to Foshan Wetland Landscape Experience Zone is located in Lightning River National Wetland Park, Bashang, Hebei Province, Eighteen point eight kilometers away from Pingdingbao Town, Guyuan County Town, covering an area of Five hundred and sixty-two point four hectares." }, { "spot_name": "Territory Gate", "img_uri": "http://10.12.33.161/api/image/Territory Gate.jpg", "introduction": "Dajimen, provincial key cultural relics protection. Located at the northern end of Zhangjiakou City, between the eastern and Western Taiping Mountains towering into the clouds, there is a well-known Great Wall Pass, which has always been a place for military strategists to contend for." }, { "spot_name": "Warm Spring Ancient Town", "img_uri": "http://10.12.33.161/api/image/Warm Spring Ancient Town.jpg", "introduction": "Located in the west of Yuxian County, Hebei Province, Nuanquan Ancient Town is a famous historical and cultural town in China. It is now a national AAA-level tourist attraction. Ancient town is named `warm spring` because of its hot spring water all the year round. The ancient town has a long history and is famous for its springs, fairs, ancient buildings and folk culture." }];
//2.创建一些页面
class province extends React.Component {
	static navigationOptions = {
		title: 'PROVINCE LIST',
	};

	constructor(props) {

		super(props);
		this.state = {
			search:'',
			data: debug_province,//this is the state of user's data
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
				search:clue,
				data: newdata,
			})
		}
	}

	headerorfooterComponent = () => {
		return (
			<View style={styles.list}>
				<SearchBar
					placeholder="Type Here..."
					onChangeText={(clue)=>this.search_(clue)}
					containerStyle={{ width: win.width - 6, height: 60, backgroundColor: 'white', borderRadius: 11, marginLeft: 3, marginRight: 3, marginTop: 3 }}
					inputContainerStyle={{ backgroundColor: 'white' }}
					searchIcon={{ size: 30, color: 'grey' }}
					inputStyle={{ fontSize: 15 }}
					placeholderTextColor={'grey'}
					// showLoading={true}
					round={true}
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
						//  ViewComponent={LinearGradient} // Don't forget this!
						//    linearGradientProps={{
						//    colors: ['red', 'pink'],
						//    start: { x: 0, y: 0.5 },
						//    end: { x: 1, y: 0.5 },
						//   }}

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
				// colors={['#eea2a2', '#bbc1bf','#57c6e1','#b49fda','#7ac5d8']} 
				// locations={ [0,0.19,0.42,0.79,1] }  
				// ['#99F2CB', '#1F4037'] green

				>
					<FlatList
						// ref="flatList"
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

class city extends React.Component {
	static navigationOptions = {
		title: "CITY LIST",
	};
	constructor(props) {
		super(props);
		this.state = {
			search:'',
			data: debug_city,//this is the state of user's data
		};
	}
	componentDidMount() {
		fetch(URL + "query=city&" + "province="
			+ this.props.navigation.state.params.value)
			.then((response) => response.json())        // json
			.then((responseData) => {
				this.setState({
					data: responseData,//when we use setState,it render again 
				})
				netdata_c = responseData;
			})
			.catch((error) => {     // handle err 

			})
			.done();
	}
	search_(clue) {
		// Alert.alert(clue)
		if (clue == "") {
			this.setState({
				data: netdata_c,
				search:'',
			})
		} else {
			let newdata = [];
			for (let i = 0; i < netdata_c.length; ++i) {
				// Alert.alert(netdata[i]['province'])	;
				if (netdata_c[i]['city'].toLowerCase().indexOf(clue) != -1) {
					newdata.push(netdata_c[i]);
				}
			}
			this.setState({
				search:clue,
				data: newdata,
			})
		}
	}

	headerorfooterComponent = () => {
		return (
			<View style={styles.list}>
				<SearchBar
					placeholder="Type Here..."
					onChangeText={(clue) => this.search_(clue)}
					containerStyle={{ width: win.width - 6, height: 60, backgroundColor: 'white', borderRadius: 11, marginLeft: 3, marginRight: 3, marginTop: 3 }}
					inputContainerStyle={{ backgroundColor: 'white' }}
					searchIcon={{ size: 30, color: 'grey' }}
					inputStyle={{ fontSize: 15 }}
					placeholderTextColor={'grey'}
					// showLoading={true}
					round={true}
					value={this.state.search}
				/>
			</View>
		)
	}

	renderItem(item) {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.list}>
				<TouchableOpacity onPress={() => navigate('details', {
					province_1: this.props.navigation.state.params.value,
					city_1: item.city
				})}>
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
						title={item.city}

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
					colors={['#fdeff9', '#e2c9cc', '#ec38bc', '#7303c0', '#03001e']}
					// 
					locations={[0, 0.25, 0.5, 0.75, 1]}
				>
					<FlatList
						// ref="flatList"
						extraData={this.state}
						keyExtractor={(item, index) => String(index)}
						data={this.state.data} // data
						renderItem={({ item }) => this.renderItem(item)} // row
						// ItemSeparatorComponent={this.separatorComponent} // separator
						horizontal={false} // row or column
						// ListEmptyComponent={this.listEmptyComponent} // show when there is no data
						numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
						ListHeaderComponent={this.headerorfooterComponent()}
					/>
					<Text style={{ textAlign: 'center' }}>cities</Text>

				</LinearGradient>

			</View>
		);
	}
}



class details extends React.Component {
	static navigationOptions = {
		title: "DETAILS LIST",
	};
	constructor(props) {
		super(props);
		this.state = {
			data: debug_details,//this is the state of user's data
		};
	}
	componentDidMount() {
		fetch(URL + "query=scenic_spot&" + "province="
			+ this.props.navigation.state.params.province_1 + "&city="
			+ this.props.navigation.state.params.city_1)
			.then((response) => response.json())        // json
			.then((responseData) => {

				this.setState({
					data: responseData,//when we use setState,it render again

				})
			})
			.catch((error) => {     // handle err 

			})
			.done();
	}
	renderItem(item) {
		return (
			<View style={styles.list}>
				<Card
					title={item.spot_name}
					image={source = { uri: item.img_uri }}>
					<Text style={{ marginBottom: 10 }}>
						{item.introduction}
					</Text>
					<Button
						// icon={<Icon name='code' color='#ffffff' />}
						backgroundColor='#03A9F4'
						buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
						title='Learn More' />
				</Card>
			</View>
		);
	}
	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<LinearGradient
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 1 }}
					colors={['#83a4d4', '#b6fbff']}
					// 
					locations={[0, 1]}
				>
					<FlatList
						// ref="flatList"
						extraData={this.state}
						keyExtractor={(item, index) => String(index)}
						data={this.state.data} // data
						renderItem={({ item }) => this.renderItem(item)} // row
						// ItemSeparatorComponent={this.separatorComponent} // separator
						horizontal={false} // row or column
						// ListEmptyComponent={this.listEmptyComponent} // show when there is no data
						numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
					/>
					<Text style={{ textAlign: 'center' }}>scenic spots</Text>
				</LinearGradient>
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
	linearGradient: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 200,
		height: 50,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5
	},
})
//3. 添加TabNavigator中
const RootTabs = createStackNavigator({
	province: {
		screen: province,
	},
	city: {
		screen: city,
	},
	details: {
		screen: details,
	}
});

const App = createAppContainer(RootTabs);
//最后导出
export default App;

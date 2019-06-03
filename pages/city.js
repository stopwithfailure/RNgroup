import React from 'react';
import { Animated, FlatList, StyleSheet, View, Dimensions, Easing, } from 'react-native';
import { SearchBar, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const URL = "http://245786ka89.zicp.vip/api/api.php?";
// const URL = "http://10.12.33.161/api/api.php?";
var netdata_c = [];
// var debug_city = [{ "city": "Zhangjiakou" }, { "city": "Cangzhou" }, { "city": "Baoding" }, { "city": "Handan" }, { "city": "Qinhuangdao" }];
var debug_city = [];
export default class city extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rotateVal: new Animated.Value(0),
			ani: 1,
			data: netdata_c = debug_city,//this is the state of user's data
			search: '',
		};
	}
	static navigationOptions = ({ navigation, navigationOptions }) => {
		return {
			title: navigation.getParam('value'),
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
		fetch(URL + "query=city&" + "province="
			+ this.props.navigation.state.params.value)
			.then((response) => response.json())        // json
			.then((responseData) => {
				Animated.loop(animationLoading).stop();
				this.setState({
					data: responseData,//when we use setState,it render again 
					ani: 0,
				})
				netdata_c = responseData;
			})
			.catch((error) => {     // handle err 

			})
			.done();
	}
	search_(clue) {
		if (clue == "") {
			this.setState({
				data: netdata_c,
				search: '',
			})
		} else {
			let newdata = [];
			for (let i = 0; i < netdata_c.length; ++i) {
				if (netdata_c[i]['city'].toLowerCase().indexOf(clue) != -1) {
					newdata.push(netdata_c[i]);
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
					placeholder="Search cities..."
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
				{
					this.state.ani == 1 ?
						<Animated.Text
							style={{
								textAlign: 'center',
								fontSize: 60,
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
							colors={['#fdeff9', '#e2c9cc', '#ec38bc', '#7303c0', '#03001e']}
							locations={[0, 0.25, 0.5, 0.75, 1]}
						><FlatList
								extraData={this.state}
								keyExtractor={(item, index) => String(index)}
								data={this.state.data} // data
								renderItem={({ item }) => this.renderItem(item)} // row
								horizontal={false} // row or column
								numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
							// ListHeaderComponent={this.headerorfooterComponent()}
							/>
						</LinearGradient>
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
		justifyContent: 'center',
		alignItems: 'center'
	},
})
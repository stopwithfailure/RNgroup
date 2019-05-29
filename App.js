import React, { Component } from 'react';

import {
	FlatList,
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Button,
	PixelRatio,
	Alert,
} from 'react-native';
//1. 导入文件

import { createStackNavigator,createAppContainer } from 'react-navigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
// import Ionicons from 'react-native-vector-icons/Ionicons';
const URL="http://10.12.33.161/api/api.php?";
// const URL="http://245786ka89.zicp.vip/api/api.php?";
// const URL="http://192.168.1.104/api/api.php?";

//2.创建一些页面
class province extends React.Component {
	static navigationOptions = {
		title: 'PROVINCE LIST',
	};
	 
	constructor(props) {
// //To get the year date and time
// const Getdate=()=>{
//     var date = new Date();
//     var year = date.getFullYear().toString();
//     var month = (date.getMonth()+1).toString();
//     var day = date.getDate().toString();
//     var hour =  date.getHours().toString();
//     var minute = date.getMinutes().toString();
//     return year+'年'+month+'月'+day+'日'+' '+hour+':'+minute;
// }

        super(props);
        this.state = {
            data: [],//this is the state of user's data
        };
	}
	
	componentDidMount(){
		fetch(URL+"query=province")
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
	renderItem(item){
		const { navigate } = this.props.navigation;
		return(
			<View>
				<TouchableOpacity onPress={()=>navigate('city',{value:item.province})}>
					<Text style={{fontSize:23}}>{item.province}</Text>
				</TouchableOpacity>
			</View>
		);
	}
	render() {
		return(
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
				<Text>provinces</Text>
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
            data: [],//this is the state of user's data
        };
    }
	componentDidMount(){
		fetch(URL+"query=city&"+"province="
		+this.props.navigation.state.params.value)
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
	renderItem(item){
		const { navigate } = this.props.navigation;
		return(
			<View>
				<TouchableOpacity onPress={()=>navigate('details',{
					province_1:this.props.navigation.state.params.value,
					city_1:item.city})}>
				<Text style={{fontSize:23}}>{item.city}</Text>
				</TouchableOpacity>
			</View>
		);
	}
	render() {
		return(
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
				<Text>cities</Text>
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
            data: [],//this is the state of user's data
        };
    }
	componentDidMount(){
		fetch(URL+"query=scenic_spot&"+"province="
		+this.props.navigation.state.params.province_1+"&city="
		+this.props.navigation.state.params.city_1)
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
	renderItem(item){
		return(
			<View>
				<Text style={{fontSize:20}}>{item.spot_name}</Text>
				<Image style={{width:400,height:150,}} source={{ uri: item.img_uri }} />
				{/* <Text>{item.img_uri}</Text> */}
				<Text>{item.introduction}</Text>
			</View>
		);
	}
	render() {
		return(
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
				<Text>scenic spots</Text>
			</View>
		);
	}
}
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

const App=createAppContainer(RootTabs);
//最后导出
export default App;
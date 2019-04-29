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
//this is the user's data
var data_users=[
    {
        login: 'mojombo',
        avatarurl: 'https://avatars0.githubusercontent.com/u/1?v=4',
        name: 'TomPreston - Werner',
        blog: 'http://tom.preston-werner.com',
        location: 'SanFrancisco',
    }, {
        login: 'defunkt',
        avatarurl: 'https://avatars0.githubusercontent.com/u/2?v=4',
        name: 'ChrisWanstrath',
        blog: 'http://chriswanstrath.com/',
        location: 'SanFrancisco'
    }, {
        login: 'pjhyett',
        avatarurl: 'https://avatars0.githubusercontent.com/u/3?v=4',
        name: 'PJHyett',
        blog: 'https://hyett.com',
        location: 'SanFrancisco'
    }, {
        login: 'wycats',
        avatarurl: 'https://avatars0.githubusercontent.com/u/4?v=4',
        name: 'YehudaKatz',
        blog: 'http://yehudakatz.com',
        location: 'SanFrancisco'
    }, {
        login: 'ezmobius',
        avatarurl: 'https://avatars0.githubusercontent.com/u/5?v=4',
        name: 'EzraZygmuntowicz',
        blog: 'http://stuffstr.com',
        location: 'IntheNW'
    }, {
        login: 'ivey',
        avatarurl: 'https://avatars0.githubusercontent.com/u/6?v=4',
        name: 'MichaelD.Ivey',
        blog: 'http://gweezlebur.com',
        location: 'BayMinette, AL'
    }, {
        login: 'evanphx',
        avatarurl: 'https://avatars0.githubusercontent.com/u/7?v=4',
        name: 'EvanPhoenix',
        blog: 'http://blog.fallingsnow.net',
        location: 'LosAngeles, CA'
    }, {
        login: 'vanpelt',
        avatarurl: 'https://avatars1.githubusercontent.com/u/17?v=4',
        name: 'ChrisVanPelt',
        blog: 'vandev.com',
        location: null
    }, {
        login: 'wayneeseguin',
        avatarurl: 'https://avatars0.githubusercontent.com/u/18?v=4',
        name: 'WayneE.Seguin',
        blog: '',
        location: 'Buffalo, NY'
    }, {
        login: 'brynary',
        avatarurl: 'https://avatars0.githubusercontent.com/u/19?v=4',
        name: 'BryanHelmkamp',
        blog: 'http://codeclimate.com',
        location: 'NewYorkCity'
    }, {
        login: 'kevinclark',
        avatarurl: 'https://avatars3.githubusercontent.com/u/20?v=4',
        name: 'KevinClark',
        blog: 'http://glu.ttono.us',
        location: null
    },
];
//In this loop,I add two properties in each data. 
for(var x=0;x<data_users.length;x++){
    data_users[x]['detail_height']=0;//this can control whather display the details
    data_users[x]['input_height']=0;//It can control whether display the inputtext component
}
export default class RNProjectTestApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],//this is the state of user's data
        };
    }
    componentDidMount=()=>  {//when all component loaded,it works
        setTimeout(() => {//after app started 3 seconds,the user's data arrived
            this.setState({
                data: data_users,//when we use setState,it render again 
            })
        }, 3000)
    }
    details(detailnum){//it controls whether the detail is displaying.
        //-----------this can get the index of item
        let index=0;
        let newdata=this.state.data;
        for(let x=0;x<newdata.length;x++){
            if(detailnum==newdata[x]){
                index=x;
                break;
            }
        }
        //-----------
        //-----------this can know whether we need to edit the location and show inputtext
        if(newdata[index]['detail_height']!=0){
            newdata[index]['detail_height']=0;
            data_users[index]['input_height']=0;
        }else if(data_users[index]['location']==null){
            if(newdata[index]['detail_height']==130){
                newdata[index]['detail_height']=0;
            }else{
                newdata[index]['detail_height']=130;
                data_users[index]['input_height']=60;
            }
        }else if(newdata[index]['detail_height']==0){
            newdata[index]['detail_height']=70;
        }
        //-----------
        //to render
        this.setState({
            data:newdata,
        })
    }
    change_location(text,textnum){//the inputtext and location is bound with this function
        //-----------(the same as above)
        let index=0;
        let newdata=this.state.data;
        for(let x=0;x<newdata.length;x++){
            if(textnum==newdata[x]){
                index=x;
                break;
            }
        }
        //------------
        newdata[index]['location']=text;//set the location
        //to render
        this.setState({
            data:newdata,
        })
    }
    deleteThis(deletenum) {// this can delete a user's data
        //-----------(the same as above)
        let index=0;
        let newdata=this.state.data;
        for(let x=0;x<newdata.length;x++){
            if(deletenum==newdata[x]){
                index=x;
                break;
            }
        }
        //-----------
        newdata.splice(index,1);//delete one element of array
        //to render
        this.setState({
            data:newdata,
        })
    }
    
    /*row*/
    renderItem(item) {
        return (
            <View >
                {/* each user */}
                <View style={styles.itemView} >
                    {/* image */}
                    <Image onPress={()=>this.details(item)} style={styles.itemImage} source={{ uri: item.avatarurl }} />
                    {/* name */}
                    <Text onPress={()=>this.details(item)} style={styles.itemName}> {item.name} </Text>
                    {/* delete button(the following view is only a background) */}
                    <View style={styles.itemButtonBackground}></View>
                    <View style={styles.itemButton}>
                        <Button onPress={()=>this.deleteThis(item)} title="Delete" color="#f9e9c3" />
                    </View>
                </View>
                {/* default:  height:0  the same effect as "display:none"
                    it will show when pressed
                */}
                <View style={[styles.itemDetail,{height:item.detail_height}]}
                    > 
                    {/* login, blog and location */}
                    <Text onPress={()=>this.details(item)}>{"login:"+item.login}</Text>
                    <Text onPress={()=>this.details(item)}>{"blog:"+item.blog}</Text>
                    <Text onPress={()=>this.details(item)}>{"location:"+item.location}</Text>
                    {/* default: height:0  the same effect as "display:none" 
                        it will show when its loaction is null
                    */}
                    <TextInput onChangeText={(text)=>this.change_location(text,item)} style={{height:item.input_height}} 
                    placeholder={"input the location/only once"}  underlineColorAndroid={'transparent'}/>
                </View>
            </View>
        )
    }

    /*separator*/
    separatorComponent() {
        return <View style={{ height: 1, backgroundColor: 'gray' }} />
    }

    /*when there is no data*/
    listEmptyComponent() {
        return <View style={styles.whenEmepty}>
                <Text style={styles.whenEmeptyText}>
                    no data!
                </Text>
            </View>
    }
    render() {
        return (
            <View style={{ flex: 0 }}>
                <FlatList
                    ref="flatList"
                    extraData={this.state}
                    keyExtractor={(item, index) => String(index)}
                    data={this.state.data} // data
                    renderItem={({ item }) => this.renderItem(item)} // row
                    ItemSeparatorComponent={this.separatorComponent} // separator
                    horizontal={false} // row or column
                    ListEmptyComponent={this.listEmptyComponent} // show when there is no data
                    numColumns={1} // set how many columns each row,  you shouldn't use columnWrapperStyle when it is 1
                />
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    itemName: {
        height: 70,
        lineHeight: 55,
        width: width - 145,
        backgroundColor: 'skyblue',
        color: 'white',
        textAlign: 'center'
    },
    itemImage: {
        width: 70,
        height: 70
    },
    itemView: {
        flexDirection: "row",
    },
    itemDetail: {
        flexDirection: "column",
    },
    itemButton: {
        marginLeft: -75,
        marginTop: 15,
        height: 35,
    },
    itemButtonBackground: {
        backgroundColor: 'skyblue',
        width: 77,
        height: 70,
    },
    whenEmepty: {
        backgroundColor: 'white',
        flex: 1,
        height: height - 100
    },
    whenEmeptyText: {
        alignItems: 'center',
        textAlign: 'center',
        lineHeight: height - 100,
        color: 'black',
        fontSize: 20,
    }
});
//it is needed when class name is not the same as file name 
AppRegistry.registerComponent('RNProjectTestApp', () => RNProjectTestApp);
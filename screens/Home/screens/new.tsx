import React, {useState, useEffect, PureComponent} from 'react';
import {View, Image, Dimensions, FlatList, RefreshControl, Text} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Banners from './recommend/Banners';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';


class Post extends PureComponent {
    
    render()
    
    {
        
        return(
        <TouchableOpacity
            onPress={()=> (useNavigation()).navigate("DetailPage", {screen: "작품 상세", params:{artWorkDetail: this.props.item, key: "new"}})}
        >
            <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+this.props.item.img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 330, width: undefined}}/>
            <View style={{marginLeft: 15, marginTop: 25}}>
                <Text style={{fontFamily: 'NotoSansKR-Bold', fontSize: 15}}>{this.props.item.title}</Text>
                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 11, color: '#9B9B9B'}}>{this.props.item.title}</Text>
            </View>
            <View style={{marginLeft: 15, marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                <View style={{ flexDirection: 'row', alignItems:'flex-start'}}>
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>조회수 {this.props.item.views}</Text>
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>저장수 {this.props.item.saves}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems:'flex-end', marginRight: 15}}>
                    <Text style={{textAlign:'right', fontSize: 19}}>{this.props.item.price}</Text>
                    <Text style={{textAlign:'right', fontSize: 14}}> KLAY</Text>
                </View>
            </View>

            <View 
                style={{
                    borderBottomColor: '#ECECEC',
                    borderBottomWidth:1,
                    marginBottom: 25
                }}
            />
            
            
        </TouchableOpacity>
        )
    }
}


export default function New(flag) {
    const {width, height} = Dimensions.get('screen');
    const tabBarHeight = useBottomTabBarHeight();
    const [artWorkData, setArtWorkData] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const [flag1, setFlag] = useState(flag)

    const [first, setFirst] = useState(true)

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    
    useEffect(() => {
        getData()
        console.log(flag1)
      

      }, [isFocused]);

        function getData(){
        
        fetch('http://3.142.144.25:8080/arts', {
            method: 'GET',
            
        }).then((response) => response.json())
            .then((json) => { console.log(json.length);
            setArtWorkData(json); setRefreshing(false)})
            .catch((error) => console.error(error))
        }


      const getHeader = () => {
        return  <View>
                    <View 
                        style={{
                            borderBottomColor: '#ECECEC',
                            borderBottomWidth:1,
                        }}
                    />
                    <Text
                        style={{
                            fontFamily: 'NotoSansKR-Bold',
                            fontSize: 15,
                            marginLeft: 15,
                            marginTop: 13,
                            marginBottom: 13,
                            color: '#3E3E3E'
                        }}> 
                        새로운 작품 >
                    </Text>
                </View>
    }

    function onRefresh(){
        setRefreshing(true);
        getData();

    }

    isFocused ? 'focused' : 'unfocused';

    return (
            <View style={{backgroundColor:'white'}}>
                {console.log("jiiih")}
                <FlatList
                    bounces = {true}
                    data = {artWorkData}
                    extraData = {isFocused}
                    ListHeaderComponent = {getHeader}
                    
                    keyExtractor={(item, index) => index.toString()} 
                    renderItem={({item}) => { 
                        return ( 
                            <Post item={item}/>
                        )
                    }}
                />
            </View>
        
    )
}


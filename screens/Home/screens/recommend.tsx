import React, {useState, useEffect} from 'react';
import {View, Image, Dimensions, FlatList, ScrollView, StatusBar, Platform, Text, Modal} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Banners from './recommend/Banners';
import ArtWorks from './recommend/ArtWorks';
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LoginAndRegisterModal from '../../../navigation/Login/Page';


export default function Recommend({navigation}) {
    const {width, height} = Dimensions.get('screen');
    const tabBarHeight = useBottomTabBarHeight();
    const [artWorkData, setArtWorkData] = useState([])
    const [saveIndexList, setSaveIndexList] = useState([] as any)

    const [savedArts, setSavedArts] = useState([])
    const [loginModalVisible, setLoginModalVisible] = useState(false)
    const [flag, setFlag] = useState(false)
  

    
    useEffect(() => {
        console.log("123412341234")
        fetchArtWorks();
        if(global.loginStatus){
            fetchSavedWorks()
          
        }
       
        

      }, [saveIndexList]);

      function saveEvent(userid, idx){

        fetch('http://3.142.144.25:8080/arts/like/' + userid, {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
                console.log(json)
                var tempList = [...saveIndexList]
                tempList[idx] = !tempList[idx]
                setSaveIndexList(tempList)
            })
          .catch((error) => console.error(error)) 

        
    }

    function saveHandler(id, idx){
        if (!global.loginStatus){
            setLoginModalVisible(true)
        }
        else{
            saveEvent(id, idx)
        }
    }

    function fetchSavedWorks(){

        fetch('http://3.142.144.25:8080/users/' + global.userId, {
            method: 'GET',
            
        }).then((response) => response.json())
        .then((json) => {
            setSavedArts(json.favorite_arts)
        })
            
        .catch((error) => console.error(error))
        
    }

    function fetchArtWorks(){
        let isFetched = false;
        fetch('http://3.142.144.25:8080/recommends', {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){ setArtWorkData(json.reverse())}})
          .catch((error) => console.error(error))
         
        return () => {
        isFetched = true;
        };
    }

    function handleConfirm(){
        setLoginModalVisible(false)
        //resetAction()
        
    }


    const getHeader = () => {
        return  <View>
                    <Banners />
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
                        추천 작품 >
                    </Text>
                </View>
    }

    return (
            <View style={{backgroundColor:'white'}}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={loginModalVisible}
                    onRequestClose={() => {
                        setLoginModalVisible(!loginModalVisible);
                    }}
                    
                >
                    <SafeAreaView style={{height: height, width: width, backgroundColor:'white'}}>
                        <View style={{alignItems:'flex-end', marginRight:20}}>
                            <TouchableOpacity onPress={() => handleConfirm()}>
                                <Text style={{fontSize:35}}>x</Text>
                            </TouchableOpacity>
                        </View>
                        <LoginAndRegisterModal handler={handleConfirm}/>
                    </SafeAreaView>

                </Modal>
                <FlatList
                    bounces = {false}
                    data = {artWorkData}
                    keyExtractor={(item, index) => index.toString()} 
                    ListHeaderComponent = {getHeader}
                    //ListFooterComponent = {getFooter}
                    renderItem={({item, index}) => { 
                        var imgSrc = require('../../../assets/icons/before-save.png')
                        if (savedArts.some(ids => ids === item.art_id._id)){
                            imgSrc = require('../../../assets/icons/after-save.png')
                        }

                        return ( 
                            <TouchableOpacity
                                onPress={()=> navigation.navigate("DetailPage", {screen: "작품 상세", params:{artWorkDetail:item, key: "recommend"}})}
                            >
                                <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+item.art_id.img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 330, width: undefined}}/>
                                <View style={{flexDirection:'row', marginHorizontal:15, marginTop: 25, justifyContent:'space-between'}}>
                                    <View>
                                        <Text style={{fontFamily: 'NotoSansKR-Bold', fontSize: 15}}>{item.art_id.title}</Text>
                                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 11, color: '#9B9B9B'}}>{item.art_id.name.username}</Text>
                                    </View>
                                    <TouchableOpacity
                                         onPress={()=> saveHandler(item.art_id._id, index)}>
                                        <View>
                                            <Image source={imgSrc} style={{height:30, width:30, resizeMode:'contain'}}/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{marginLeft: 15, marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                                    <View style={{ flexDirection: 'row', alignItems:'flex-start'}}>
                                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>조회수 {item.art_id.views}</Text>
                                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>저장수 {item.art_id.saves}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems:'flex-end', marginRight: 15}}>
                                        <Text style={{textAlign:'right', fontSize: 19}}>{item.art_id.price}</Text>
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
                    }}
                />
            </View>
        
    )
}
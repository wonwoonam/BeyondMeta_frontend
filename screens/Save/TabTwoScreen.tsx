import React, { useState, useEffect } from "react";
import {Text, View, Button, TouchableOpacity, Modal, Dimensions, FlatList, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import LoginAndRegisterModal from '../../navigation/Login/Page'

import All from './SavedArt/allNew'

import SavedArtistPage from '../Save/SavedArt/savedArtistPage';
import SavedArtPage from '../Save/SavedArt/savedArtPage';
import { TextInput } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';


const Tab = createMaterialTopTabNavigator();
const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

export default function TopBarNavigator({navigation}){
    
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [savedArtists, setSavedArtists] = useState([]);
    const [savedArts, setSavedArts] = useState([]);
    const [updated, setUpdated] = useState(false);
    const [hi, setHI] = useState(false)

    const isFocused = useIsFocused();

  
    function justChange(){
        fetchData()
        return savedArtists
    }

    async function fetchData(){
       
        await fetch('http://3.142.144.25:8080/users/' + global.userId, {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
            console.log(json)
            Promise.all((json.favorite_arts).map((u) => fetchArt(u))).then((da)=> setSavedArts(da))
            Promise.all((json.favorite_artists).map((u) => fetchUser(u))).then((da) => setSavedArtists(da))
        
            })
          .catch((error) => console.error(error))

    }

    useEffect(() => {
       

        fetchData()
       
      }, [isFocused]);


    
    async function fetchArt(artid){
        console.log('second')
        let temp = {}
        await fetch('http://3.142.144.25:8080/arts/' + artid, {
                method: 'GET',
                
            }).then((response) => response.json())
            .then((json) => {temp=json})
            .catch((error) => console.error(error))
            
        return temp
    }


    async function fetchUser(userid){
        console.log('third')
        console.log(userid)
        let temp = {}
        await fetch('http://3.142.144.25:8080/users/' + userid, {
                method: 'GET',
                
            }).then((response) => response.json())
            .then((json) => {
                console.log(json)
                temp=json})
            .catch((error) => console.error(error))
        console.log(temp)
        return temp
    }

    function getArtistData(){
        return savedArtists
    }
    

    function handleConfirm(){
        setLoginModalVisible(false)
        //resetAction()
        
    }

    
    isFocused ? 'focused' : 'unfocused';

    if (!global.loginStatus){
        return(
            <View style={{alignItems:'center', justifyContent:'center', flex:1, backgroundColor: '#F2F2F2'}}>
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


                <Text style={{paddingBottom:20}}>회원 정보가 없습니다.</Text>
                <TouchableOpacity 
                    style={{backgroundColor: '#50C878', paddingHorizontal:30, paddingVertical:10, borderRadius:5}}
                    onPress={()=> setLoginModalVisible(true)}>

                    <Text style={{color:'white', fontWeight:'bold'}}>로그인</Text>
                </TouchableOpacity>
            </View>
        )
      }
    
    return(

        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeTintColor: '#50C878',
                inactiveTintColor: '#898989',
                labelStyle: {fontSize: 15, fontFamily: 'NotoSansKR-Medium'},
                style: {backgroundColor: 'white'},
                indicatorStyle:{backgroundColor:'#50C878', height: 4},
                tabStyle:{height: 40, top:-4}
            }}
        >   
           
            <Tab.Screen
                name="SavedArtist"
                options={{tabBarLabel: "작가"}}
            >
                {()=>
                    <SavedArtistPage data={savedArtists} handler={justChange} getData={getArtistData}/>
                    
                }
            </Tab.Screen>
            

            <Tab.Screen
                name="SavedArt"
                options={{tabBarLabel: "작품"}}
            >
                {()=>
                    <SavedArtPage data={savedArts}/>
                }
            </Tab.Screen>

        </Tab.Navigator>
    ) 
    
}


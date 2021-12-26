import React, { useState } from "react";
import {Text, View, Button, Modal, TouchableOpacity, Touchable, SafeAreaView, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import All from '../Home/screens/new/allNew'
import MyAssetStack from '../Wallet/screens/myasset/myasset'
import KeepingAssetPage from '../Wallet/screens/keeping/keepingasset'
import SellingPage from '../Wallet/screens/selling/selling'

import LoginAndRegisterModal from '../../navigation/Login/Page'

import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();

const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;


function MyTabs() {
    const isFocused = useIsFocused();
    const [loginModalVisible, setLoginModalVisible] = useState(false);
   

    

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
                name="Wallet"
                component={MyAssetStack}
                options={{tabBarLabel: "나의 자산"}}
            />

            <Tab.Screen
                name="keeping"
                component={KeepingAssetPage}
                options={{tabBarLabel: "보유중"}}
            />

            <Tab.Screen
                name="Selling"
                component={SellingPage}
                options={{tabBarLabel: "판매중"}}
            />

            

        </Tab.Navigator>
    ) 
    
}

export default function TopBarNavigatorWallet(){
    return(
    
        <MyTabs />
     
    )

}
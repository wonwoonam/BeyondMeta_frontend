import React, {useState} from 'react';
import {Alert, View, Modal, ImageBackground, Text, FlatList, Dimensions, TouchableOpacity, Image, Button} from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { Navigation } from 'react-native-navigation';

import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ratio = screenWidth/1232
const height = ratio * 252


const tradeData = [
    {
        trade: 'sold',
        time: '2021-05-16 14:10:30',
        boughtRatio: '2KLAY / 1,600KRW',
        boughtPrice: '3,200KRW',
        soldRatio: '3KLAY / 2,000KRW',
        soldPrice: '6,000KRW',
        profitPercent: '+180%',
        profitKRW: '2,800KRW'
    },
    {
        trade: 'bought',
        time: '2021-05-16 14:10:30',
        boughtRatio: '2KLAY / 1,600KRW',
        boughtPrice: '3,200KRW',
    },
    {
        trade: 'sold',
        time: '2021-05-16 14:10:30',
        boughtRatio: '2KLAY / 1,600KRW',
        boughtPrice: '3,200KRW',
        soldRatio: '3KLAY / 2,000KRW',
        soldPrice: '6,000KRW',
        profitPercent: '+180%',
        profitKRW: '2,800KRW'
    },
    {
        trade: 'bought',
        time: '2021-05-16 14:10:30',
        boughtRatio: '2KLAY / 1,600KRW',
        boughtPrice: '3,200KRW',
    }
]



const copyToClipboard = (txt) => {
    
    Alert.alert(
        '클립보드에 복사 되었습니다',
        '',
        [
          {
            text: "확인",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          
        ]
      );
  };




function MyAssetPage({navigation, route}){

    
   
    const [addressModalVisible, setAddressModalVisible] = useState(false);

    const getHeader = () => {
        return(
        <View>
            <ImageBackground source={require('../../../../assets/images/walletbackground.png')} resizeMode={'contain'} style={{width: screenWidth, height: height }}>
                <View style={{marginLeft: 20, flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={{color:'white', fontSize: 16, fontFamily: 'NotoSansKR-Bold' }}>안녕하세요, {'\n'}남원우님</Text>
                    <TouchableOpacity onPress={() => setAddressModalVisible(true)} style={{marginRight:20, backgroundColor:'#634A9B', paddingBottom: 7, paddingTop:7, paddingLeft:30, paddingRight:30, borderRadius: 7}}>
                        <View>
                            <Text style={{color:'white', fontSize: 13, fontFamily: 'NotoSansKR-Bold', includeFontPadding: false}} adjustsFontSizeToFit={true}>내주소보기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            <View style = {{backgroundColor: '#3B4153'}}>
                <View style = {{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                    <Text style={{color: 'white', marginLeft: 20, marginTop:20, fontSize: 15, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false}} adjustsFontSizeToFit={true}>총 보유수량</Text>
                    <Text style={{color: 'white', marginRight: 20, marginTop:20, fontSize: 22, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>210,321 KLAY</Text>
                </View>
                <View style = {{flex:1, flexDirection:'row', marginTop: 20, justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color:'white', marginLeft: 20, fontSize: 14, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false}} adjustsFontSizeToFit={true}>평가손익</Text>
                    <Text style={{color:'#D54C4C', marginRight: 20, fontSize: 15, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>+96,964 원</Text>
                </View>
                <View style = {{flex:1, flexDirection:'row', marginTop: 5, justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{color:'white', marginLeft: 20, fontSize: 14, fontFamily: 'NotoSansKR-Regular', includeFontPadding: false}} adjustsFontSizeToFit={true}>수익률</Text>
                    <Text style={{color:'#D54C4C', marginRight: 20, fontSize: 15, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>+14.49%</Text>
                </View>
                <View style={{width: windowWidth, height: 1, backgroundColor: 'white', marginTop: 20, marginBottom: 10}}/>
                <TouchableOpacity onPress={()=> navigation.navigate("SendTokenPage", {screen: "토큰 보내기"}) } style = {{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'center', marginBottom: 10}}>    
                    <Image source={require('../../../../assets/icons/TokenSendBtn.png')} style={{width:20, resizeMode: 'contain'}} />
                    <Text style={{textAlign:'center', color:'white', fontSize: 16, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false, marginLeft:5}} adjustsFontSizeToFit={true}>토큰 보내기</Text>
                </TouchableOpacity>
                
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center', backgroundColor: 'white', paddingTop: 35, paddingBottom:10}}>
                <Text style={{fontSize: 15, fontFamily: 'NotoSansKR-Bold', color: '#3E3E3E', marginLeft:20}}>거래내역</Text>
                
                <View style={{flexDirection:'row', alignItems:'center'}} >
                    <TouchableOpacity
                            style={{
                                    borderWidth:1,
                                    marginRight: 15,
                                    borderRadius: 7,
                                    paddingVertical:0,
                                    padding: 4,
                                    borderColor: '#C4C4C4'}}
                            
                        >
                        <Text style={{color:'#393939', fontSize: 13, fontFamily: 'NotoSansKR-Regular', includeFontPadding:false}} adjustsFontSizeToFit={true}>30일</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                            style={{
                                    borderWidth:1,
                                    marginRight: 15,
                                    paddingVertical:0,
                                    borderRadius: 7,
                                    padding: 4,
                                    borderColor: '#C4C4C4'}}
                            
                        >
                        <Text style={{color:'#393939', fontSize: 13, fontFamily: 'NotoSansKR-Regular', includeFontPadding:false}} adjustsFontSizeToFit={true}>거래전체</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        )
    }

    return(
        
        <View>
            <Modal
                animationType="none"
                transparent={true}
                visible={addressModalVisible}
                onRequestClose={() => {
                    setAddressModalVisible(!addressModalVisible);
                  }}
            >
                <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{width:screenWidth-120, justifyContent:'flex-start'}}>
                        <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                            <Text style={{textAlign:'center', marginBottom:40}}>지갑 주소: {'\n'} 0x293hj22121323j12312</Text>
                        </View> 
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={() => setAddressModalVisible(!addressModalVisible)}
                                style={{backgroundColor:'#50C878', flex:1, paddingVertical:20, borderBottomRightRadius:7, borderBottomLeftRadius:7}}
                            >
                                <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>
            
            <FlatList 
                data = {tradeData}
                bounces = {false}
                ListHeaderComponent = {getHeader}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {    

                    const Sold=()=>{
                        return(
                            <View style={{marginRight:10, marginBottom:10, marginLeft:10, marginTop:10}}>
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#D54C4C', fontFamily: 'NotoSansKR-Medium', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>판매완료</Text>
                                    <Text style={{color:'#D54C4C', fontFamily: 'NotoSansKR-Medium', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.profitPercent}</Text>
                                </View>

                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#8D8D8D', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.time}</Text>
                                    <Text style={{color:'#D54C4C', fontFamily: 'NotoSansKR-Medium', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.profitKRW}</Text>
                                </View>

                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding: false}} adjustsFontSizeToFit={true}>구매수량/시세</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.boughtRatio}</Text>
                                </View>
                                
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding: false}} adjustsFontSizeToFit={true}>구매금액</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.boughtPrice}</Text>
                                </View>

                                <View style={{ flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding: false}} adjustsFontSizeToFit={true}>판매수량/시세</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.soldRatio}</Text>
                                </View>
                                
                                <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding: false}} adjustsFontSizeToFit={true}>판매금액</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.soldPrice}</Text>
                                </View>
                            </View>
                        )
                    }

                    const Bought=() =>{
                        return(
                            <View style={{marginRight:10, marginBottom:10, marginLeft:10, marginTop:10}}>
                                <Text style={{color: '#4C5CD5', fontFamily: 'NotoSansKR-Medium', fontSize: 13, includeFontPadding:false}} adjustsFontSizeToFit={true}>구매완료</Text>
                                <Text style={{color:'#8D8D8D', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.time}</Text>

                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding:false}} adjustsFontSizeToFit={true}>구매 수량/시세</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.boughtRatio}</Text>
                                </View>
                                
                                <View style={{flex:1, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 12, includeFontPadding:false}} adjustsFontSizeToFit={true}>구매 금액</Text>
                                    <Text style={{color:'#2F2F2F', fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.boughtPrice}</Text>
                                </View>
                                
                            </View>

                        )
                    }

                    if (item.trade == "sold"){
                        if (tradeData.indexOf(item) == tradeData.length -1){
                            return(
                                <View style={{backgroundColor:'white', marginLeft: 7, marginRight:7, marginTop:7, marginBottom:7, borderRadius:5}}>
                                    <Sold/>
                                </View>
                            )
                        }else{
                            return(
                                <View style={{backgroundColor:'white', marginLeft: 7, marginRight:7, marginTop:7, borderRadius:5}}>
                                    <Sold/>
                                </View>
                            )
                        }       
                    }else{
                        if (tradeData.indexOf(item) == tradeData.length -1){
                            return(
                                <View style={{backgroundColor:'white', marginLeft: 7, marginRight:7, marginTop:7, marginBottom: 7, borderRadius:5}}>
                                    <Bought/>
                                </View>
                            )
                        }else{
                            return(
                                <View style={{backgroundColor:'white', marginLeft: 7, marginRight:7, marginTop:7, borderRadius:5}}>
                                    <Bought/>
                                </View>
                            )
                        }
                        
                    }
                    
                }}
            />
        </View>
    )
}
const Stack = createStackNavigator();
    
    

export default function MyAssetStack({navigation, route}) {
    
    

    return (
        
        <Stack.Navigator>
            <Stack.Screen name="AssetPage" component={MyAssetPage} options={() => ({headerShown: false})}/>
            
        </Stack.Navigator>
        
    );
}
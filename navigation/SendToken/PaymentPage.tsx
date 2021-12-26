import React, {useState} from 'react';
import {TouchableOpacity, Modal, View, Alert, Text, FlatList, Dimensions, TextInput, Image, SafeAreaView, ImageBackground} from 'react-native'

import { StackActions, CommonActions} from '@react-navigation/native';



const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


export default function PaymentPage({route, navigation}){
    
    const tokenNum = route.params.tokenNum
    const address = route.params.address
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    function resetAction(){ 
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { 
                    name: 'Root',
                    state: {
                        routes: [
                        { name: 'TabFour' },
                       
                        ]
                    } 
                },
                
              ],
            })
          )
    }


    function handleConfirm(){
    
        setConfirmModalVisible(false)
        resetAction()
        
    }


    return(
        <SafeAreaView style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
            <Modal
                animationType="none"
                transparent={true}
                visible={confirmModalVisible}
                onRequestClose={() => {
                    setConfirmModalVisible(!confirmModalVisible);
                  }}
                
            >
                <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'flex-start', width: screenWidth-120}}>
                        <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                            <Text style={{textAlign:'center', marginBottom:40}}>결제 완료!</Text>
                        </View> 
                        <View style={{ justifyContent:'center'}}>
                            <TouchableOpacity
                                onPress={() => handleConfirm()}
                                style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomRightRadius:7, borderBottomLeftRadius:7}}
                            >
                                <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>
            
            <View>
                <View style={{backgroundColor:'white', paddingBottom: 45}}>
                    <Text style={{color:'#1F1F1F', marginTop:20, marginBottom:20, marginLeft: 20, fontSize: 18, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>결제 정보</Text>
                    <View style = {{flexDirection:'row', marginTop: 10, justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={{color:'#8D8D8D', marginLeft: 30, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>작품 수</Text>
                        <Text style={{color:'#1F1F1F', marginRight: 20, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>{tokenNum} 개</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginTop: 10, justifyContent: 'space-between', alignItems:'center'}}>
                        <Text style={{color:'#8D8D8D', marginLeft: 30, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>받는 지갑 주소</Text>
                        <Text style={{color:'#1F1F1F', marginRight: 20, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>{address}</Text>
                    </View>
                    <View style = {{flexDirection:'row', marginTop: 10, justifyContent: 'space-between', alignItems:'center'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{color:'#8D8D8D', marginLeft: 30, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>수수료</Text>
                            <TouchableOpacity style={{marginLeft:5, alignItems:'center'}}>
                                <Image style={{height:15, width:15}} source={require('../../assets/icons/questionIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color:'#1F1F1F', marginRight: 20, fontSize: 14, fontFamily: 'NotoSansKR-Medium', includeFontPadding: false}} adjustsFontSizeToFit={true}>0.014 KLAY</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1}}/>
            </View>
            <View style={{alignItems:'center', bottom:30}}>
                <TouchableOpacity 
                    onPress={()=> setConfirmModalVisible(true)}
                    style={{
                        backgroundColor:'#50C878',
                        alignItems:'center',
                        marginTop:20,
                        height: 45,
                        width: 295,
                        justifyContent:'center',
                        borderRadius: 10,
                        
                    }}>
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13,color:'white'}}>결제 하기</Text>
                </TouchableOpacity>
            </View>
            
        </SafeAreaView>
    )

}
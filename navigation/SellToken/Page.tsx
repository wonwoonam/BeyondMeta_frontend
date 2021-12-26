import React, {useState} from 'react';
import {Dimensions ,Modal, TouchableOpacity, View, Alert, Text, FlatList, TextInput, Image, SafeAreaView, ImageBackground} from 'react-native'
import { StackActions, CommonActions} from '@react-navigation/native';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function SellToken({route, navigation}){


    const artWorkDetail = route.params.artWorkDetail
    const artIndex = route.params.index
    const [textInpt, onChangeTextInpt] = useState('')
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [confirmSecondModalVisible, setConfirmSecondModalVisible] = useState(false);

    const handleSell = () =>{
        if (textInpt ===""){
            Alert.alert(
                '판매가를 입력해주세요.',
                '',
                [
                  {
                    text: "확인",
                    style: "cancel"
                  },
                  
                ]
              );
        }else{
            setConfirmModalVisible(true)
        }
    }

    const handleConfirm = () =>{
        setConfirmModalVisible(false)
        setConfirmSecondModalVisible(true)

        fetch('http://3.142.144.25:8080/users/sell/6120b538e52a1c4f432fdecc/'+artWorkDetail._id, {
            method: 'POST',
            body: JSON.stringify({
                price: textInpt
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
            
        }).then((response) => response.json())
          .then((json) => {return json})
          .catch((error) => console.error(error))
    }

    function resetAction(){ 

        setConfirmSecondModalVisible(false)
        navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                { 
                    name: 'Root',
                    state: {
                        routes: [
                        { 
                            name: 'TabFour',
                            state: {
                                routes:[
                                    {
                                        name: 'TabFourScreen',
                                        state: {
                                            routes:[
                                                {
                                                    name: 'keeping'
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                         },
                       
                        ]
                    } 
                },
                
              ],
            })
          )
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
                            <Text style={{textAlign:'center', marginBottom:40}}>{artWorkDetail.title} 를 {'\n'} {textInpt} KLAY에 {'\n'} 판매하시겠습니까?</Text>
                        </View> 
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => handleConfirm()}
                                    style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => setConfirmModalVisible(false)}
                                    style={{backgroundColor:'#7B7B7B', paddingVertical:20, borderBottomRightRadius:7}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>취소</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>
            <Modal
                animationType="none"
                transparent={true}
                visible={confirmSecondModalVisible}
                onRequestClose={() => {
                    setConfirmSecondModalVisible(!confirmSecondModalVisible);
                  }}
                
            >
                <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'flex-start', width: screenWidth-120}}>
                        <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                            <Text style={{textAlign:'center', marginBottom:40}}>{artWorkDetail.title}{'\n'} [판매중]</Text>
                        </View> 
                        <View style={{ justifyContent:'center'}}>
                            
                            <TouchableOpacity
                                onPress={() => resetAction()}
                                style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                            >
                                <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                            </TouchableOpacity>
                            
                            
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>
            <View>
                <View style={{paddingTop:20, paddingBottom:40, paddingHorizontal:20, backgroundColor:'white'}}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>작품명</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393', includeFontPadding: false}} adjustsFontSizeToFit={true}>{artWorkDetail.title}</Text>
                    </View>
                    <View style={{marginVertical:15, borderBottomColor: '#D5D5D5', borderBottomWidth:1}}/>
                    <View style = {{marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매가격</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393', includeFontPadding: false}} adjustsFontSizeToFit={true}>{artWorkDetail.priceKlay}</Text>
                    </View>
                    <View style = {{marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F', includeFontPadding: false}} adjustsFontSizeToFit={true}>시세</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{artWorkDetail.ratio}</Text>
                    </View>
                    <View style = {{marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매금액</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{artWorkDetail.priceKRW}</Text>
                    </View>
                    <View style = {{marginBottom:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>거래수</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{artWorkDetail.nonce}</Text>
                    </View>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                        <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매일자</Text>
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}> {artWorkDetail.time}</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1}}/>
                <View style={{borderBottomColor: '#F2F2F2', borderBottomWidth:5}}/>
                <View style={{paddingTop:20, paddingBottom:40, backgroundColor:'white'}}>
                    <Text style={{paddingLeft:20, marginBottom: 20, fontFamily: 'NotoSansKR-Bold', fontSize: 12, color:'#3E3E3E', includeFontPadding: false}} adjustsFontSizeToFit={true}>판매 가격 *</Text>
                    <View style={{paddingRight:20, paddingLeft:40, flexDirection:'row', alignItems:'center',justifyContent:'flex-end'}}>
                        <View style={{flex:1, alignItems:'stretch', marginRight:10}}>
                            <TextInput
                                style={{height: 40,
                                    textAlign:'right',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#A8A8A8',
                                    padding: 10}}
                                onChangeText={onChangeTextInpt}
                                value={textInpt}
                                placeholder="판매가격을 적어주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType="numeric"
                                returnKeyType='done'
                            />
                        </View>
                        <Text> KLAY</Text>
                    </View>
                </View>
                <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1}}/>
            </View>
            <View style={{alignItems:'center',bottom:30}}>
                <TouchableOpacity 
                    onPress={()=> handleSell()}
                    style={{
                        backgroundColor:'#50C878',
                        alignItems:'center',
                        marginTop:20,
                        height: 45,
                        width: 295,
                        justifyContent:'center',
                        borderRadius: 10,
                        
                    }}>
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13,color:'white'}}>판매 하기</Text>
                </TouchableOpacity>
            </View>
        
        
        </SafeAreaView>
    )

}

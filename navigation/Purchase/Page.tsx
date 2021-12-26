import React, {useState} from 'react';
import { TouchableOpacity, Modal, View, Alert, Text, FlatList, Dimensions, TextInput, Image, SafeAreaView, ImageBackground} from 'react-native'
import { LineChart} from "react-native-chart-kit";
import { StackActions, CommonActions} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;



export default function PurchasePage({route, navigation}){

    const details = route.params.artWorkDetail

    return(
        <ScrollView style={{backgroundColor:'white'}}>
            <View style={{margin:20}}>
                <Text style={{marginBottom:20}}>구매자 정보</Text>
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                    <Text>닉네임</Text>
                    <Text>dimensionNft</Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                    <Text>지갑 주소</Text>
                    <Text>0x2kd23knfqiodafnafsdfadsg</Text>
                </View>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1}} />
            <View style={{backgroundColor: '#F2F2F2', height:5}}/>
            <View style={{margin:20}}>
                <Text style={{marginBottom:20}}>판매자 정보</Text>
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                    <Text>닉네임</Text>
                    <Text>MemArtist</Text>
                </View>
                <View style={{flexDirection:"row", justifyContent:'space-between'}}>
                    <Text>지갑 주소</Text>
                    <Text>0xgkd23knfqiodafnafsdfadsg</Text>
                </View>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1}} />
            <View style={{backgroundColor: '#F2F2F2', height:5}}/>
            <Text style={{margin:20}}>거래 작품 정보</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', margin:20}}>
                <View>
                    <View style={{margin:10}}>
                        <Text style={{marginBottom:10}}>작품명</Text>
                        <Text>Memphis Mor</Text>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={{marginBottom:10}}>원작자</Text>
                        <Text>MemArtist</Text>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={{marginBottom:10}}>로열티 수수료</Text>
                        <Text>15%</Text>
                    </View>
                </View>
                
                <Image source={{uri: 'http://3.142.144.25:8080/images/'+ details.img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 180, width: 180}}/>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1}}/>
            <View style={{backgroundColor: '#F2F2F2', height:5}}/>

            <View style={{margin:20, flexDirection:'row', justifyContent: 'space-between'}}>
                <Text>할인 쿠폰</Text>
                <TouchableOpacity>
                    <Text> > </Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1}}/>

            <View style={{margin:20}}>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                    <Text>작품 가격</Text>
                    <Text>{details.price}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                    <Text>수수료</Text>
                    <Text>{details.price}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
                    <Text>쿠폰적용</Text>
                    <Text>{details.price}</Text>
                </View>
                <View style={{backgroundColor: 'black', height:1}}/>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginVertical:20}}>
                    <Text>총 결제 금액</Text>
                    <Text>{details.price} KLAY</Text>
                </View>
            </View>

            <TouchableOpacity style={{ backgroundColor:'#50C878', borderRadius: 7, padding:15, marginBottom:40,marginHorizontal:20, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white'}}>252.12 KLAY 결제하기</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
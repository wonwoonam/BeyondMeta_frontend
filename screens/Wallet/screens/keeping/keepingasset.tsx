import React, {useState, useEffect} from 'react';
import {Modal ,SafeAreaView, View, TextInput, Text, FlatList, Dimensions, TouchableOpacity, Image, Button} from 'react-native'

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;





export default function KeepingAssetPage({navigation}){
    
   
    const [artList, setArtList] = useState([])
  

    useEffect(() => {
        let isFetched = false;
        
        fetch('http://3.142.144.25:8080/users/6120b538e52a1c4f432fdecc/notonsale', {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){ setArtList(json)}})
          .catch((error) => console.error(error))
         
        return () => {
            
            isFetched = true;
        };

      }, []);

   
    return(
        <SafeAreaView style={{flex:1}}>
            
            <View style={{backgroundColor: 'white', paddingVertical:10}}>
                
                <Text style={{marginLeft:20, fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false, color:'#3E3E3E'}} adjustsFontSizeToFit={true}>총 {artList.length} 작품</Text>
            </View>
            <View 
                    style={{
                        borderBottomColor: '#D6D6D6',
                        borderBottomWidth:1,
    
                    }}
            />
            <FlatList
                    //ListHeaderComponent = {getHeader}
                    data = {artList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => {
                        var btmPad = 0
                        const Body= ()=> {
                            return(
                                <View style={{flexDirection:'row', margin:20}}>
                                    
                                    <Image source={{uri: 'http://3.142.144.25:8080/images/'+item.img, cache: "force-cache"}} style={{resizeMode: 'contain' ,width:115, height: null}}/>
                                    <View style={{justifyContent:'flex-end', flex:1, marginLeft:20}}>
                                        <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 13,includeFontPadding:false, marginBottom:10}} adjustsFontSizeToFit={true}>{item.title}</Text>
                                        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매가격</Text>
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393', includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.priceKlay}</Text>
                                        </View>
                                        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F', includeFontPadding: false}} adjustsFontSizeToFit={true}>시세</Text>
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.ratio}</Text>
                                        </View>
                                        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매금액</Text>
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.priceKRW}</Text>
                                        </View>
                                        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>거래수</Text>
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}>{item.nonce}</Text>
                                        </View>
                                        <View style = {{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                            <Text style={{fontFamily: 'NotoSansKR-Regular', fontSize: 13, color:'#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}>구매일자</Text>
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#939393',includeFontPadding: false}} adjustsFontSizeToFit={true}> {item.time}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor:'#50C878',
                                                alignItems:'center',
                                                marginTop:20,
                                                height: 28,
                                                justifyContent:'center',
                                                borderRadius: 7,
                          
                                            }}
                                            onPress={()=> navigation.navigate("SellingOwnedTokenPage", {screen: "판매 하기", params:{artWorkDetail:item, index: index}})}
                                        >
                                            <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>판매하기</Text>
                                        </TouchableOpacity>
                                        
                                    </View>
                                </View>
                            )
                        }

                        

                        if (artList.indexOf(item) == artList.length -1){ 
                            btmPad=20
                            console.log(item.img)
                        }

                        return(
                            <View style={{backgroundColor: 'white', borderRadius:7, marginLeft:10, marginRight:10, marginTop: 10, marginBottom:btmPad}}>
                                <Body/>
                            </View>
                        ) 
                    
                    }}
                />
        </SafeAreaView>

        

    )




}
import React, {useState} from 'react';
import {TouchableOpacity, View, Alert, Text, FlatList, TextInput, Image, SafeAreaView, ImageBackground} from 'react-native'


const images = [
    {src: require('../../assets/images/artImage/image1.png'), name: 'Memorphus'}, 
    {src: require('../../assets/images/artImage/image2.png'), name: 'SpaceMan'}, 
    {src: require('../../assets/images/artImage/image3.png'), name: 'MetaFace'}, 
    {src: require('../../assets/images/artImage/image4.png'), name: 'Arabian Camel #2321'}, 
    {src: require('../../assets/images/artImage/image1.png'), name: 'Membus'}
]




export default function SendToken({navigation}){

    
    const [tokenList, setTokenList] = useState([]);
    const [buttonList, setButtonList] = useState([])
    const [listLength, setListLength] = useState(0)
    const [textInpt, onChangeTextInpt] = useState('');

    function initBtnList(){
        for (let index = 0; index < images.length; index++) {
            buttonList.push(false)
        }
    }
    
    function handleAdd(obj, index){
        if (buttonList.length === 0){
            initBtnList()
        }

        if (tokenList.indexOf(obj) === -1){
            tokenList.push(obj)
            buttonList[index] = true
           
            setListLength(tokenList.length)
        }else{
            buttonList[index] = false
            var ind = tokenList.indexOf(obj)
            tokenList.splice(ind, 1)
            setListLength(tokenList.length)

            
        }        
       
    }

    function handleNextNav(){
            if (tokenList.length === 0){
                Alert.alert(
                    '토큰을 선택해 주세요.',
                    '',
                    [
                        {
                          text: "확인",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        
                      ]
                )
            }else if(textInpt === ""){
                Alert.alert(
                    '보낼 주소를 입력해 주세요.',
                    '',
                    [
                        {
                          text: "확인",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel"
                        },
                        
                      ]
                )
            }else{
                navigation.navigate("결제 하기", { tokenNum: tokenList.length, address: textInpt})
            }
    }

    return(
        <SafeAreaView style={{flex:1, flexDirection:'column', justifyContent:'space-between'}}>
            <View style={{backgroundColor:'white'}}>
                <Text style={{marginTop:10, marginBottom:10,marginLeft:20, fontFamily: 'NotoSansKR-Regular', fontSize: 13,color:'#3E3E3E', includeFontPadding: false}} adjustsFontSizeToFit={true}>총 {tokenList.length} 작품 선택됨</Text>
                <FlatList
                    horizontal
                    data={images}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => { 
                        
                
                        if (images.indexOf(item) == 0){ 
                            return(
                                <TouchableOpacity onPress={() => handleAdd(item, index)} style={{justifyContent:'center', alignItems:'center'}} activeOpacity={1}> 
                                    <ImageBackground source={item.src} style={{marginVertical:20, marginRight:30, marginLeft:30, height:150, width: 150, alignItems:'flex-end'}}>
                                        <Image source={buttonList[index] ? require('../../assets/icons/clicked-round.png') : require('../../assets/icons/unclicked-round.png')} style={{width:30, height:30, marginRight:-15, marginTop:-15}}/>
                                    </ImageBackground>
                                    <Text style={{marginBottom:10, fontFamily:'NotoSansKR-Regular', fontSize:13, includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }else{
                            return(
                                <TouchableOpacity onPress={() => handleAdd(item, index)} style={{ justifyContent:'center', alignItems:'center'}} activeOpacity={1}> 
                                    <ImageBackground source={item.src} style={{marginVertical:20, marginRight:30, height:150, width: 150, alignItems:'flex-end'}}>
                                        <Image source={buttonList[index] ? require('../../assets/icons/clicked-round.png') : require('../../assets/icons/unclicked-round.png')} style={{width:30, height:30, marginRight:-15, marginTop:-15}}/>
                                    </ImageBackground>
                                    <Text style={{marginBottom:10, marginRight:30,  fontFamily:'NotoSansKR-Regular', fontSize:13, includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        }
                        
                    }}
                />
                <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1, marginTop: 30}}/>
                <View style={{borderBottomColor: '#F2F2F2', borderBottomWidth:5}}/>
                <View style={{marginTop:30, marginBottom:20, marginHorizontal:40}}>
                    <Text style={{marginBottom: 20, fontFamily: 'NotoSansKR-Bold', fontSize: 12, color:'#3E3E3E', includeFontPadding: false}} adjustsFontSizeToFit={true}>받는 지갑 주소 *</Text>
                    <TextInput
                        style={{height: 40,
                            borderRadius:10,
                            borderColor: '#A8A8A8',
                            borderWidth: 1,
                            padding: 10}}
                        onChangeText={onChangeTextInpt}
                        value={textInpt}
                        placeholder="지갑 주소를 적어주세요."
                        placeholderTextColor = '#A0A0A0'
                        keyboardType="numeric"
                        returnKeyType='done'
                    />
                </View>
                <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1, marginTop: 30}}/>
            </View>
            <View style={{backgroundColor:'rgba(52, 52, 52, 0.0)', alignItems:'center', bottom:30}}>
                <TouchableOpacity 
                    onPress={handleNextNav}
                    style={{
                        backgroundColor:'#50C878',
                        alignItems:'center',
                        marginTop:20,
                        height: 45,
                        width: 295,
                        justifyContent:'center',
                        borderRadius: 10,
                        
                    }}>
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 13,color:'white'}}>{tokenList.length}개의 토큰 보내기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
  }
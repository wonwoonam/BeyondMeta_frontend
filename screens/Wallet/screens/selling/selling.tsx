import React, {useState, useEffect} from 'react';
import {Modal, TextInput, SafeAreaView, View, ImageBackground, Text, FlatList, Dimensions, TouchableOpacity, Image, Button} from 'react-native'
import KeepingAssetPage from '../../../WalletTab/screens/keeping/keepingasset'


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

    
export default function SellingPage(){

    const [stopMode, setStopMode] = useState(false);
    const [tokenList, setTokenList] = useState([]);
    const [afterButtonList, setAfterButtonList] = useState([]);
    const [listLength, setListLength] = useState(0)
    
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [finalConfirmModalVisible, setFinalConfirmModalVisible] = useState(false);

    const [changePriceModalVisible, setChangePriceModalVisible] = useState(false);

    const [changeArtId, setChangeArtId] = useState('');

    const [artList, setArtList] = useState([])

    const [textInpt, onChangeTextInpt] = useState('')
  

    useEffect(() => {
        let isFetched = false;

        fetch('http://3.142.144.25:8080/users/6120b538e52a1c4f432fdecc/onsale', {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){ setArtList(json)}})
          .catch((error) => console.error(error))
         
        return () => {
            
            isFetched = true;
        };

      }, []);


    function initBtnList(){
        for (let index = 0; index < artList.length; index++) {
           
            afterButtonList.push(false)
        }
    }
    
    function handleAdd(obj, index){
 
        if (afterButtonList.length === 0){
            initBtnList()
        }

        if(tokenList.indexOf(obj) === -1){
            tokenList.push(obj)
            afterButtonList[index] = true
            setListLength(tokenList.length)

        }else{
            afterButtonList[index] = false
            var ind = tokenList.indexOf(obj)
            tokenList.splice(ind, 1)
            setListLength(tokenList.length)
            
        }        
    }

    function handleSelectAll(){
        if (tokenList.length !== artList.length){
            var tempList = []
            var objList = []
            setTokenList([])
            for (let index = 0; index < artList.length; index++) {
                tempList.push(true)
                objList.push(artList[index])
            }
            setTokenList(objList)
            setAfterButtonList(tempList)
            setListLength(tokenList.length)
        }else{
            setTokenList([])
            setAfterButtonList([])
            initBtnList()
            setListLength(tokenList.length)
        }
        
    }

    function headerBeforeSelect(){
        if (tokenList.length === 0){
            return(
                <TouchableOpacity
                    style={{
                        backgroundColor:'#E3E3E3',
                        alignItems:'center',
                        paddingHorizontal:20,
                        height: 26,
                        marginRight: 20,
                        justifyContent:'center',
                        borderRadius: 7,
                    }}
                    onPress={()=> setStopMode(!stopMode)}
                >
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>선택 (0)</Text>
                </TouchableOpacity>
            )
        }else{
            return(
                <TouchableOpacity
                    style={{
                        backgroundColor:'#50C878',
                        alignItems:'center',
                        paddingHorizontal:20,
                        height: 26,
                        marginRight: 20,
                        justifyContent:'center',
                        borderRadius: 7,
                    }}
                    onPress={()=> setConfirmModalVisible(true)}
                >
                    <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>선택 ({tokenList.length}) 판매 중단</Text>
                </TouchableOpacity>
            )
        }
    }

    function renderHeader(){
        if (!stopMode){
            return(
                <View style={{backgroundColor: 'white', paddingVertical:10, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <Text style={{marginLeft:20, fontFamily: 'NotoSansKR-Regular', fontSize: 13, includeFontPadding: false, color:'#3E3E3E'}} adjustsFontSizeToFit={true}>총 {artList.length} 작품</Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor:'#50C878',
                            alignItems:'center',
                            paddingHorizontal:20,
                            height: 26,
                            marginRight: 20,
                            justifyContent:'center',
                            borderRadius: 7,
                        }}
                        onPress={()=> setStopMode(!stopMode)}
                    >
                        <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>판매 중단</Text>
                    </TouchableOpacity>
                </View>
            )
        }else{
            return(
                <View style={{backgroundColor: 'white', paddingVertical:10, flexDirection:'row', justifyContent: 'space-between', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', marginLeft:30}}>
                        <TouchableOpacity
                            onPress={()=> setStopMode(!stopMode)}
                            style={{marginRight:20}}
                        >
                            <Text style={{fontFamily: 'NotoSansKR-Medium',fontSize:12, color:'#3E3E3E'}}>취소</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleSelectAll()}>
                            <Text style={{fontFamily: 'NotoSansKR-Medium',fontSize:12, color:'#3E3E3E'}}>전체 선택</Text>
                        </TouchableOpacity>
                    </View>
                    {headerBeforeSelect()}
                </View>
            )
        }
    }


    return(
        <SafeAreaView style={{flex:1}}>
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
                            <Text style={{textAlign:'center', marginBottom:40}}>{tokenList.length !==0 ? tokenList[0].title : ''} 외 {'\n'} {tokenList.length-1} 개의 작품을 {'\n'} 판매 중단 하시겠습니까?</Text>
                        </View> 
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setConfirmModalVisible(false)
                                        setFinalConfirmModalVisible(true)
                                        for (let index = 0; index < tokenList.length; index++) {
                                            
                                            fetch('http://3.142.144.25:8080/users/notsell/6120b538e52a1c4f432fdecc/'+tokenList[index]._id, {
                                                method: 'POST',
                                            }).then((response) => response.json())
                                            .then((json) => {return json})
                                            .catch((error) => console.error(error))
                                        }
                                        
                                    }}
                                    style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setConfirmModalVisible(false)
                                    }}
                                    style={{backgroundColor:'#7B7B7B', paddingVertical:20, borderBottomLeftRadius:7}}
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
                visible={finalConfirmModalVisible}
                onRequestClose={() => {
                    setFinalConfirmModalVisible(!finalConfirmModalVisible);
                  }}
                
            >
                <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'flex-start', width: screenWidth-120}}>
                        <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                            <Text style={{textAlign:'center', marginBottom:40}}>{tokenList.length !==0 ? tokenList[0].title : ''} 외 {'\n'} {tokenList.length-1} 작품이 {'\n'} 판매 중단 되었습니다.</Text>
                        </View> 
                        <View style={{ justifyContent:'center'}}>
                            
                            <TouchableOpacity
                                onPress={() => {
                                    setFinalConfirmModalVisible(false)
                                    setStopMode(!stopMode)
                                    setTokenList([])
                                    setListLength(0)
                                    fetch('http://3.142.144.25:8080/users/6120b538e52a1c4f432fdecc/onsale', {
                                        method: 'GET',
                                        
                                    }).then((response) => response.json())
                                    .then((json) => {
                                        {setArtList(json)}})
                                    .catch((error) => console.error(error))
                                    
                                }}
                                style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                            >
                                <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                            </TouchableOpacity>
                            
                            
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>


            <Modal
                animationType="none"
                transparent={true}
                visible={changePriceModalVisible}
                onRequestClose={() => {
                    setChangePriceModalVisible(!changePriceModalVisible);
                  }}
                
            >
                <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
                    <View style={{justifyContent:'flex-start', width: screenWidth-120}}>
                        <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                            <View style={{alignItems:'stretch', marginRight:10}}>
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
                        </View> 
                        <View style={{flexDirection:'row', justifyContent:'center'}}>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setChangePriceModalVisible(false)                                      
                                        fetch('http://3.142.144.25:8080/arts/'+changeArtId, {
                                            method: 'PUT',
                                            body: JSON.stringify({
                                                price: textInpt
                                            }),
                                            headers: {
                                                'Accept':       'application/json',
                                                'Content-Type': 'application/json',
                                            }
                                        }).then((response) => response.json())
                                        .then((json) => {
                                            console.log(json)
                                            return json})
                                        .catch((error) => console.error(error))
                                        
                                        
                                    }}
                                    style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>확인</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flex:1, alignItems:'stretch'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setChangePriceModalVisible(false)
                                    }}
                                    style={{backgroundColor:'#7B7B7B', paddingVertical:20, borderBottomLeftRadius:7}}
                                >
                                    <Text style={{textAlign:'center', color:'white'}}>취소</Text>
                                </TouchableOpacity>
                            </View>
                            
                        </View>
                    </View>
                        
                    
                </View>

            </Modal>

            

            {renderHeader()}
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
                        const Body= ()=> {

                            if (!stopMode){
                                return(
                                    <View style={{flexDirection:'row', margin:20}}>
                                        <Image source={{uri: 'http://3.142.144.25:8080/images/'+item.img}} style={{resizeMode: 'contain' ,width:140, height: null}}/>
                                        <View style={{flex:1, justifyContent:'flex-end', marginLeft:20}}>
                                            <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: '#4C5CD5', includeFontPadding:false, marginBottom:5}} adjustsFontSizeToFit={true}>판매중</Text>
                                            <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 13,includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.title}</Text>
                                            <Text style={{textAlign:'right',fontFamily: 'NotoSansKR-Regular', fontSize: 12, color: '#939393', includeFontPadding: false, marginBottom:20}} adjustsFontSizeToFit={true}>판매시작일: {item.time}</Text>
                                            <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#575757', includeFontPadding:false}} adjustsFontSizeToFit={true}>현재 판매가</Text>
                                            <Text style={{textAlign:'right',fontFamily: 'NotoSansKR-Bold', fontSize: 17, color: '#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}> {item.price}</Text>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:'#50C878',
                                                    alignItems:'center',
                                                    marginTop:10,
                                                    height: 28,
                                                    width: 100,
                                                    justifyContent:'center',
                                                    borderRadius: 7,
                                                    alignSelf:'flex-end'
                                                    
                                                    
                                                }}
                                                onPress={() => {
                                                    setChangeArtId(item._id)
                                                    setChangePriceModalVisible(true)
                                                }}
                                            >
                                            <Text style={{textAlign: 'right',fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>가격변경</Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }else{
                                return(
                                    <View style={{flexDirection:'row', margin:20}}>
                                        <Image source={{uri: 'http://3.142.144.25:8080/images/'+item.img}} style={{resizeMode: 'contain' ,width:140, height: null}}/>
                                        <View style={{flex:1, justifyContent:'flex-end', marginLeft:20}}>
                                            <TouchableOpacity onPress={()=> handleAdd(item, index)}>
                                                <Image source={afterButtonList[index] ? require('../../../../assets/icons/clicked-rect.png') : require('../../../../assets/icons/unclicked-rect.png')} style={{alignSelf:'flex-end', width:20, height:20}}/>
                                            </TouchableOpacity>
                                            <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 13,includeFontPadding:false}} adjustsFontSizeToFit={true}>{item.title}</Text>
                                            <Text style={{textAlign:'right',fontFamily: 'NotoSansKR-Regular', fontSize: 12, color: '#939393', includeFontPadding: false, marginBottom:20}} adjustsFontSizeToFit={true}>판매시작일: {item.time}</Text>
                                            <Text style={{textAlign:'right', fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#575757', includeFontPadding:false}} adjustsFontSizeToFit={true}>현재 판매가</Text>
                                            <Text style={{textAlign:'right',fontFamily: 'NotoSansKR-Bold', fontSize: 17, color: '#2F2F2F',includeFontPadding: false}} adjustsFontSizeToFit={true}> {item.price}</Text>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:'#A0A0A0',
                                                    alignItems:'center',
                                                    marginTop:10,
                                                    height: 28,
                                                    width: 100,
                                                    justifyContent:'center',
                                                    borderRadius: 7,
                                                    alignSelf:'flex-end'
                                                }}
                                                activeOpacity={1}
                                            >
                                            <Text style={{textAlign: 'right',fontFamily: 'NotoSansKR-Medium', fontSize: 13, color: 'white', includeFontPadding:false}} adjustsFontSizeToFit={true}>가격변경</Text>
                                        </TouchableOpacity>
                                        </View>
                                    </View>
                                )
                            }
                        }

                        if (artList.indexOf(item) == artList.length -1){ 
                            return(
                                <View style={{backgroundColor: 'white', borderRadius:7, marginLeft:10, marginRight:10, marginTop: 10, marginBottom:20}}>
                                    <Body/>
                                </View>
                            ) 
                        }else{
                            return(
                                <View style={{backgroundColor: 'white', borderRadius:7, marginLeft:10, marginRight:10, marginTop: 10}}>
                                    <Body/>
                                </View>
                            ) 

                        }
                    
                    }}
                />
        </SafeAreaView>

        

    )




}
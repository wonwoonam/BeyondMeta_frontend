import React, {useState} from 'react';
import { TouchableOpacity, Modal, View, Alert, Text, FlatList, Dimensions, TextInput, Image, SafeAreaView, ImageBackground} from 'react-native'
import { LineChart} from "react-native-chart-kit";
import { StackActions, CommonActions} from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import LoginAndRegisterModal from '../Login/Page'


const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;


export default function DetailPage({route, navigation}){
    const keyword = route.params.key;
    var details = getDetails();
    var username = getUsername();
    const [loginModalVisible, setLoginModalVisible] = useState(false);
   

    

    function handleCancel(){
    
        setLoginModalVisible(false)
        //resetAction()
        
    }



    function getDetails(){
        var temp;
        if (keyword == "new" || keyword == "saves"){
            temp = route.params.artWorkDetail
        }else{
            temp = route.params.artWorkDetail.art_id
        }
        return temp
    }

    function getUsername(){
        var temp;
        if (keyword == "search"){
            temp = details.name

        }else if(keyword =="saves"){
            fetch('http://3.142.144.25:8080/users/' + route.params.name, {
                method: 'GET',
            }).then((response) => response.json())
            .then((json) => {
                temp = json.username
                })
            .catch((error) => console.error(error))
         
        }else{
            temp = details.name.username
        }
        return temp
    }

    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
            color: (opacity = 1) => `rgba(0,0,0, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
      
      };


    const chartConfig = {
        backgroundGradientFrom: "#ffff",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#ffff",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
      };


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
        <ScrollView style={{backgroundColor: 'white'}}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={loginModalVisible}
                onRequestClose={() => {
                    setLoginModalVisible(!loginModalVisible);
                }}
            >
                <SafeAreaView style={{height: screenHeight, width: screenWidth, backgroundColor:'white'}}>
                    <View style={{alignItems:'flex-end', marginRight:20}}>
                        <TouchableOpacity onPress={() => handleCancel()}>
                            <Text style={{fontSize:35}}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <LoginAndRegisterModal/>
                </SafeAreaView>

            </Modal>






            <View style={{padding:20}}>
                <Text>{details.title}</Text>
                <Text>{username}</Text>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1, marginBottom:20}} />
            <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+ details.img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 330, width: undefined}}/>
            <View style={{padding:20}}>
                <View style={{flexDirection:'row'}}>
                    <Text>현재 판매가</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginRight:10}}>{details.price}Klay</Text>
                    <Text>({details.price_klay}원)</Text>
                </View>
                <TouchableOpacity 
                    onPress={()=> {if (global.loginStatus){navigation.navigate("PurchasePage", {screen: "결제하기", params:{artWorkDetail: details, index: 0}})}else{ setLoginModalVisible(true)}} }
                    style={{ backgroundColor:'#50C878', borderRadius: 7, padding:15, marginVertical:20}}>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{color:'white', fontSize: 13, fontFamily: 'NotoSansKR-Bold', includeFontPadding: false}} adjustsFontSizeToFit={true}>지금 구매하기</Text>
                    </View>
                    </TouchableOpacity>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1}} />
            <View style={{backgroundColor: '#F2F2F2', height:5, marginBottom:20}}/>
            <View style={{flexDirection:'row', margin:20}}>
                <Text>Owned by</Text>
                <Text> Digit</Text>
            </View>

            <View style={{margin:20, borderRadius:10, borderWidth:1, borderColor:'#BEBEBE'}}>
                <View style={{margin:20}}>
                    <Text>세부사항</Text>
                </View>
                
                <View style={{backgroundColor: '#BEBEBE', height:1, alignItems:'stretch'}} />
                <View style={{backgroundColor:'#FBFAFF', borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between', margin:20, }}>
                        <Text>저장수</Text>
                        <Text>{details.saves} 회</Text>
                    </View>
                    <View style={{flexDirection:'row', justifyContent:'space-between', margin:20, marginTop:-10 }}>
                        <Text>조회수</Text>
                        <Text>{details.views} 회</Text>
                    </View>
                    
                </View>
            </View>

            <View style={{margin:20, borderRadius:10, borderWidth:1, borderColor:'#BEBEBE'}}>
                <View style={{margin:20}}>
                    <Text>가격 변동 기록</Text>
                </View>
                
                <View style={{backgroundColor: '#BEBEBE', height:1, alignItems:'stretch'}} />
                <View style={{paddingVertical:20 ,backgroundColor:'#FBFAFF', justifyContent:'center', alignItems:'center', borderBottomRightRadius:10, borderBottomLeftRadius:10}}>
                    <LineChart
                        data={data}
                        width={screenWidth-40}
                        height={120}
                        chartConfig={chartConfig}
                        withDots={false}
                        withInnerLines={false}
                        
                    />
                </View>
            </View>
            <View style={{backgroundColor: '#D5D5D5', height:1, marginTop:20}} />
            <View style={{backgroundColor: '#F2F2F2', height:5, marginBottom:20}}/>
            <View style={{margin:20}}>
                <Text>{details.title}의 다른 작품</Text>
            </View>
            
        </ScrollView>
    )

}
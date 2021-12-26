import React, { useState, useEffect  } from "react";
import {Text, View, ActivityIndicator, Dimensions, Image, Modal, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import Recommend from './screens/recommend';
import New from './screens/new.tsx';
import Best from './screens/best.tsx';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useIsFocused } from '@react-navigation/native';
import ModalSingleTemplate from '../../navigation/ModalTemplate/ModalSingle.tsx'


const Tab = createMaterialTopTabNavigator();

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

function MyTabs(props) {

    const [first, setFirst] = useState(true)
    const [flag, setFlag] = useState(props.flag)
    const isFocused = useIsFocused();
    
    useEffect(()=>{
        console.log("mytabs")
        setFlag(props.flag)
        console.log(flag)
        console.log("mytabs11")
    }, [])

    isFocused ? 'focused' : 'unfocused';

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
                name="Recommend"
                component={Recommend}
                options={{tabBarLabel: "추천"}}
            />

            <Tab.Screen
                name="New"
                options={{tabBarLabel: "최신작"}}
            >
                {()=>New(props.flag)}
            </Tab.Screen>

            {/* <Tab.Screen
                name="Best"
                component={Best}
                options={{tabBarLabel: "베스트"}}
            />*/}

            {/* <Tab.Screen
                name="Special"
                component={Best}
                options={{tabBarLabel: "특별전"}}
            /> */}
        </Tab.Navigator>
    ) 
    
}





export default function TopBarNavigator(){
    const [mintingModalVisible, setMintingModalVisible] = useState(false);
    const [taxModalVisible, setTaxModalVisible] = useState(false);
    const [finishMintingModal, setFinishMintingModal] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [tax, setTax] = useState('');
    const [price, setPrice] = useState('');

    const[flag, setFlag] = useState(false)

    const[activityAnimating, setActivityAnimating] = useState(false)

    


    useEffect(() => {
        
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, [flag]);



    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

       

        if (!result.cancelled) {
            setImage(result.uri);
            
        }
    };

    function imageFrame(){
        if(image == null){
            return(
                <View style={{backgroundColor:'#F7F7F7', width:150, height:150, borderColor:'#C2C2C2', borderWidth:1}}>
                </View>
            )
        }else{
            
            return(
                
                <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
            )
        }
    }

    function mintTokenHandler(){
        setActivityAnimating(true)
       
        
        const form = new FormData();

        form.append('thumbnailImage', {
            uri: image,
            type: 'image/jpg',
            name: 'image.jpg',
        });

        fetch('http://3.142.144.25:8080/images', {
            method: 'POST',
            body: form,
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.text())
        .then((text) => { addArt(text); })
        .catch((error) => console.error(error))

    }

    function addArt(imageUrl){
        fetch('http://3.142.144.25:8080/arts', {
            method: 'POST',
            body: JSON.stringify({
                img: imageUrl,
                title: title,
                desc: description,
                price: parseInt(price, 10),
                recent_price: {}
            }),
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
        .then((json) => {setMintingModalVisible(false); setFlag(true);setActivityAnimating(false); setFinishMintingModal(true) })
        .catch((error) => console.error(error))
    }

    function MintTokenPage(){
        return(
            <KeyboardAvoidingView style={{flex:1}} behavior="height">
                 <ActivityIndicator animating={activityAnimating} size="large" color="#00ff00"
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} 
                />
                 
                 <Modal
                    animationType="fade"
                    transparent={true}
                    visible={taxModalVisible}
                    onRequestClose={() => {
                        setTaxModalVisible(!taxModalVisible);
                    }}
                    >
                    <View style={{width:width, height:height, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(39,39,39,0.73)'}}>
                        <View style={{backgroundColor:'white', width:200, height:150, justifyContent:"space-evenly", borderWidth:1}}>
                            <TouchableOpacity onPress={()=> {setTaxModalVisible(false); setTax("10%")}}>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text>10%</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{width:180, height:1, alignSelf:'center', backgroundColor:'black'}}/>
                            <TouchableOpacity onPress={()=> {setTaxModalVisible(false); setTax("15%")}}>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text>15%</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{width:180, height:1, alignSelf:'center', backgroundColor:'black'}}/>
                            <TouchableOpacity onPress={()=> {setTaxModalVisible(false); setTax("20%")}}>
                                <View style={{justifyContent:'center', alignItems:'center'}}>
                                    <Text>20%</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>


                <ScrollView>
                    <View style={{flexDirection:'row', marginVertical:30}}>
                        <View>
                            <View style={{marginHorizontal:20, alignItems:'center'}}>
                                <Text style={{fontWeight:'bold'}}>이미지, 비디오, 오디오, 3D 모델</Text>
                                <Text style={{paddingTop:20, paddingBottom:10}}>업로드 가능 파일 유형:</Text>
                                <Text style={{paddingBottom:20}}>JPG, PNG, GIF, SVG, MP4</Text>
                            </View>
                            <TouchableOpacity onPress={pickImage}>
                                <View style={{height:40, borderRadius:10, marginHorizontal:20,  alignItems:'center', justifyContent:'center', marginTop:10, backgroundColor:'#50C878'}}>
                                    <Text style={{color:'white'}}>작품 업로드 하기</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {imageFrame()}
                    </View>

                    <View style={{backgroundColor:'#D3D3D3', height:1, width:width}}/>
                    <View style={{backgroundColor:'#F2F2F2', height:6, width:width}}/>
                    <View style={{margin:20}}>
                        <View>
                            <Text>제목*</Text>
                            <TextInput
                                style={{height: 40,
                                    textAlign:'left',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#A8A8A8',
                                    }}
                                onChangeText={setTitle}
                                value={title}
                                placeholder="작품의 제목을 입력해 주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='default'
                                returnKeyType='done'
                                clearButtonMode="always"
                            />
                        </View>
                        <View style={{marginVertical:20}}>
                            <Text style={{marginBottom:20}}>설명</Text>
                            <TextInput
                                style={{height: 150,
                                    textAlign:'left',
                                    borderColor: '#A8A8A8',
                                    borderWidth:1,
                                    paddingHorizontal:20,
                                    borderRadius:10}}
                                onChangeText={setDescription}
                                value={description}
                                placeholder="작품의 설명을 입력해 주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='default'
                                returnKeyType='done'
                                clearButtonMode="always"
                                blurOnSubmit={true}
                                multiline={true}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginVertical:10}}>
                            <Text>수수료</Text>
                            <TouchableOpacity onPress={()=> setTaxModalVisible(true)}>
                                <View style={{width:100, height:40, borderColor: '#A8A8A8',
                                    borderWidth:1,
                                    paddingHorizontal:20,
                                    borderRadius:10,
                                    justifyContent:'center'}}>
                                    <Text style={{textAlign:'right'}}>{tax}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', marginVertical:10}}>
                            <Text>가격</Text>
                            <TextInput 
                                style={{height: 40,
                                    width:250,
                                    textAlign:'right',
                                    borderColor: '#A8A8A8',
                                    borderWidth:1,
                                    paddingHorizontal:20,
                                    borderRadius:10}}
                                onChangeText={setPrice}
                                value={price}
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='number-pad'
                                returnKeyType='done'
                                clearButtonMode="always"
                                blurOnSubmit={true}
                              

                            />
                        </View>
                    </View>    
                    <TouchableOpacity style={{marginHorizontal:20}} onPress={() => mintTokenHandler()}>
                        <View style={{height:50, borderRadius:10,  alignItems:'center', justifyContent:'center', marginTop:10, backgroundColor: (title=='' || description=='' || image == null || tax == '' || price == '') ? '#BFBFBF':'#50C878'}}>
                            <Text style={{color: 'white'}}>토큰 발행하기</Text>
                        </View>
                    </TouchableOpacity>      

                </ScrollView>
                

            </KeyboardAvoidingView>
        )
    
    }

    function cancelHandler(){
        setFinishMintingModal(false)
        setFlag(false)
    }


    return(
        <View style={{flex:1}}>
            {console.log(flag)}
            <MyTabs flag={flag}/>

            <View style={{position:'absolute', bottom:20, right:20, width:70, height:70, backgroundColor:'white', justifyContent:'center', alignItems:'center', borderRadius:70, borderColor:'#50C878', borderWidth:1, shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      height: 3,
      width: 2
    }}}>
                <TouchableOpacity style={{justifyContent:'center', alignItems:'center', width:70, height:70}} onPress={()=> setMintingModalVisible(true)}>
                     <Text style={{color:'#50C878', lineHeight:20, fontSize:17, fontWeight:'bold'}} numberOfLines={2}>토큰{'\n'}발행</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={mintingModalVisible}
                onRequestClose={() => {
                    setMintingModalVisible(!mintingModalVisible);
                }}
            >
                <SafeAreaView style={{height: height, width: width, backgroundColor:'white'}}>
                    <View style={{alignItems:'flex-end', marginRight:20}}>
                        <TouchableOpacity onPress={() => setMintingModalVisible(false)}>
                            <Text style={{fontSize:35}}>x</Text>
                        </TouchableOpacity>
                    </View>
                    {MintTokenPage()}
                </SafeAreaView>
            </Modal>

            <Modal
                animationType="none"
                transparent={true}
                visible={finishMintingModal}
                onRequestClose={() => { setFinishMintingModal(!finishMintingModal)}}
            >
                <ModalSingleTemplate mainText="토큰이 발행되었습니다." confirmText="확인" confirmAction={()=>cancelHandler()}/>
            </Modal>


        </View>
        
     
    )

}
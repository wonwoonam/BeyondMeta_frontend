import React , {useEffect, useState} from 'react';
import {ScrollView, Dimensions, Text, TouchableOpacity, Image, FlatList, SafeAreaView} from 'react-native';

import { View } from '../../../components/Themed';

import { useIsFocused } from '@react-navigation/native';


export default function SavedArtistPage(props) {
    const {width, height} = Dimensions.get('screen');
    const [artistData, setArtistData] = useState(props.data)
    const isFocused = useIsFocused();

    useEffect(()=>{
       
        updateData()
        console.log(artistData)

    }, [isFocused])

    function updateData(){
        const hi = props.handler()
        setArtistData(hi)
    }

    function unsaveHandle(userid, index){
        fetch('http://3.142.144.25:8080/users/like/' + userid, {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
                var array = [...artistData];
                array.splice(index, 1);
                setArtistData(array);
            })
          .catch((error) => console.error(error))
          
          
       
        
    }
    
    
    isFocused ? 'focused' : 'unfocused';

    if(artistData.length == 0){
        
        return(
            <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text>저장된 작가가 없습니다.</Text>
                
            </SafeAreaView>
        )
    }

    return(
        <View>
            <FlatList
                bounces = {false}
                data = {artistData}
       
                keyExtractor={(item, index) => index.toString()} 
                renderItem={({item, index}) => { 
                    return ( 
                        <TouchableOpacity
                          //onPress={()=> navigation.navigate("DetailPage", {screen: "작품 상세", params:{artWorkDetail:item, key: "saves"}})}
                        >
                            <View style={{flexDirection:'row', height:100,alignItems:'center', backgroundColor:'white', paddingHorizontal:20}}>
                                
                                <View style={{shadowColor: "black", shadowOffset: { height: 0, width: 2}, shadowRadius:6, shadowOpacity: 0.5, borderRadius:40}}>
                                    <Image source={{uri: 'http://3.142.144.25:8080/images/'+ item.user_img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 50, width: 50, borderRadius:70}}/>
                                </View>
                                <View style={{marginLeft:20}}>
                                    <Text style={{fontWeight:'bold', }}>{item.username}</Text>
                                </View>
                                
                                <View style={{flexDirection:'row', justifyContent:'flex-end', flex:1}}>
                                    <TouchableOpacity onPress={()=>unsaveHandle(item._id,index)}>
                                        <Image source={require('../../../assets/icons/after-save.png')} style={{height:30, resizeMode:'contain'}}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View 
                                style={{
                                    borderBottomColor: '#ECECEC',
                                    borderBottomWidth:1,
                                    
                                }}
                            />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )

}
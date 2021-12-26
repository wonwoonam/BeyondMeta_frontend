import React , {useEffect} from 'react';
import {ScrollView, Dimensions, Text, TouchableOpacity, Image, FlatList, View} from 'react-native';


export default function SavedArtPage(props) {
    
    return(
        <FlatList
            data={props.data}
            keyExtractor={(item, index) => index.toString()} 
            style={{backgroundColor:'white'}}
            scrollEnabled={true}
            renderItem={({item}) => { 
            return ( 
                <View style={{marginTop:20}}>
                    <View style={{flexDirection:'row'}}>
                        <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+item.img}} style={{width: 200, height: 200, marginLeft: 15, marginRight: 15}} />
                        <View style={{flex:1}}>
                            <View>
                                <View>
                                    <Text style={{fontSize:15, width: 100}} numberOfLines={1}>{item.title}</Text>
                                    <Text style={{fontSize:11, color: '#656565', width:100}} numberOfLines={1}>{item.title}</Text>
                                    <Text style={{fontSize:10, color: '#9B9B9B'}}>저장수 {item.saves}</Text>
                                
                                </View>
                            </View>
                            <View style={{alignItems: 'flex-end', position: 'absolute', bottom: 1, right: 10}}>
                                <Text style={{fontSize:10, color: '#9B9B9B'}}>조회수 {item.views}</Text>
                                <Text style={{fontSize:22}}>{item.price}</Text>
                                <Text style={{fontSize:14, color: '#9F9F9F'}}>KLAY</Text>
                            </View>
                        </View>
                        
                    </View>

                    <View 
                    style={{
                        borderBottomColor: '#ECECEC',
                        borderBottomWidth:1,
                        marginTop: 25
                    }}
                    />
                </View>
            )
            }}

        />
    )




}
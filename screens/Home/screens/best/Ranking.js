import * as React from 'react';
import {ScrollView, Dimensions, Text, TouchableOpacity, Image, View} from 'react-native';

export default function Ranking(){

    return(
        <View>
            <View style={{marginLeft: 15, marginBottom: 15, flexDirection: 'row', alignItems:'center', flex:1}}>
                <View style={{flexDirection: 'row', alignItems:'center', flex:1}}>
                    <Image source={require('../../../../assets/icons/crown.png')} style={{width: 30, resizeMode: 'contain'}}/>
                    <Text>아티스트 랭킹 ></Text>
                </View>
                <TouchableOpacity
                        style={{
                                marginRight: 15,
                                flexDirection: 'row', 
                                alignItems:'center',
                                }}
                        
                    >
                        <Text>총 체결액순 v</Text>
                    </TouchableOpacity>
            </View>
        </View>

    )
}
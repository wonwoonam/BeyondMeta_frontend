import * as React from 'react';
import {View, Dimensions, FlatList, ScrollView, StatusBar, Platform, Text, TouchableOpacity} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import TopArt from './best/TopArt'
import Ranking from './best/Ranking'
import Constants from 'expo-constants';
import { SafeAreaView } from 'react-native-safe-area-context';




const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const iosnavbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
const andnavbarHeight = Constants.statusBarHeight - StatusBar.currentHeight

export default function Best() {
    const {width, height} = Dimensions.get('screen');
    const tabBarHeight = useBottomTabBarHeight();


    const getHeader = () => {
        return  <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                    <Text> 이번주 Top5 작품 ></Text>
                    <TouchableOpacity
                        style={{
                                marginRight: 15,
                                flexDirection: 'row', 
                                alignItems:'center',
                                }}
                        
                    >
                        <Text> 체결액순 v</Text>
                    </TouchableOpacity>
                </View>
    }

    const getFooter = () => {

        return  <View>
                    <TopArt/>
                    <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1, marginTop: 30}}/>
                    <View style={{borderBottomColor: '#F2F2F2', borderBottomWidth:5}}/>
                    <Ranking />
                </View>
    }

    return (
        

            <FlatList 
                bounces={false} 
                style={{backgroundColor:'white', width,height,}}
                ListHeaderComponent = {getHeader}
                ListFooterComponent = {getFooter}
            
            />

            // <ScrollView bounces={false} style={{backgroundColor:'white', width,height,}}>
            //     <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
            //         <Text> 이번주 Top5 작품 ></Text>
            //         <TouchableOpacity
            //             style={{
            //                     marginRight: 15,
            //                     flexDirection: 'row', 
            //                     alignItems:'center',
            //                     }}
                        
            //         >
            //             <Text> 체결액순 v</Text>
            //         </TouchableOpacity>
            //     </View>

            //     <TopArt/>
            //     <View style={{borderBottomColor: '#D5D5D5', borderBottomWidth:1, marginTop: 30}}/>
            //     <View style={{borderBottomColor: '#F2F2F2', borderBottomWidth:5}}/>
            //     <Ranking />
                
            // </ScrollView>
       

    )
}
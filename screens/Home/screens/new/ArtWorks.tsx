import {SafeAreaView,FlatList, Text, Image, View, Dimensions, MaskedViewComponent, Platform} from 'react-native'
import * as React from 'react';


const {width, height} = Dimensions.get('screen');

const beforeSave = require('../../../../assets/icons/before-save.png');
const afterSave = require('../../../../assets/icons/after-save.png');

const DATA = 
    [{
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image1.png')
    },
    {
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image2.png')
    },
    {
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image3.png')
    },
    {
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image4.png')
    },
    {
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image1.png')
    },
    {
        title: 'Arabian Camel 9884',
        name: 'Arabian Camel',
        views: '1,245회',
        saves: '54회',
        price: '1.231',
        img: require('../../../../assets/images/artImage/image2.png')
    },



    ]




export default function ArtWorks(){
    return(

        <FlatList
        style={{width}}
        data={DATA}
        keyExtractor={(item, index) => index.toString()} 
        style={{backgroundColor:'white'}}
        scrollEnabled={true}
        renderItem={({item}) => { 
          return ( 
            <View>
                <View style={{flexDirection:'row', marginBottom: 15}}>
                    <Image source={item.img} style={{width: 200, height: 200, marginLeft: 15, marginRight: 15}} />
                    <View style={{flex:1}}>
                        <View>
                            <View>
                                <Text style={{fontSize:15, width: 100}} numberOfLines={1}>{item.title}</Text>
                                <Text style={{fontSize:11, color: '#656565', width:100}} numberOfLines={1}>{item.name}</Text>
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
                    marginBottom: 25
                }}
                />
            </View>
          )
        }}

      />

    )
}
import {SafeAreaView,FlatList, Text, Image, View, Dimensions, MaskedViewComponent, Platform} from 'react-native'
import React, {useState, useEffect} from 'react';
import  AppLoading  from 'expo-app-loading';

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

    

    const [artWorkData, setArtWorkData] = useState([])
    const [imagesLoaded,setImagesLoaded] = useState(false);

    
    useEffect(() => {
        let isFetched = false;

        fetch('http://3.142.144.25:8080/arts', {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){ setArtWorkData(json)}})
          .catch((error) => console.error(error))
         
        return () => {
        isFetched = true;
        };

      }, []);


    return(

        <FlatList
            style={{width}}
            data={artWorkData}
            bounces={false}
            keyExtractor={(item, index) => index.toString()} 
            scrollEnabled={true}
            renderItem={({item}) => { 
                return ( 
                    <View>
                        <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+item.img}} style={{resizeMode: 'contain', justifyContent:'center' ,height: 330, width: undefined}}/>
                        <View style={{flexDirection:'rows'}}>
                            <View style={{marginLeft: 15, marginTop: 25}}>
                                <Text style={{fontFamily: 'NotoSansKR-Bold', fontSize: 15}}>{item.title}</Text>
                                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 11, color: '#9B9B9B'}}>{item.name}</Text>
                            </View>
                            <View>
                                <Image source={require('../../../../assets/icons/before-save.png')} style={{height:30, resizeMode:'contain'}}/>
                            </View>
                        </View>
                        <View style={{marginLeft: 15, marginTop: 10, marginBottom: 20, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                            <View style={{ flexDirection: 'row', alignItems:'flex-start'}}>
                                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>조회수 {item.views}</Text>
                                <Text style={{fontFamily: 'NotoSansKR-Medium', fontSize: 12, color: '#9B9B9B'}}>저장수 {item.saves}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems:'flex-end', marginRight: 15}}>
                                <Text style={{textAlign:'right', fontSize: 19}}>{item.price}</Text>
                                <Text style={{textAlign:'right', fontSize: 14}}> KLAY</Text>
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

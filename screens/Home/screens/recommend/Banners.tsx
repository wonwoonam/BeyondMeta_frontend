import {SafeAreaView,FlatList, TouchableOpacity, StyleSheet, Image, View, Dimensions, MaskedViewComponent, Platform} from 'react-native'
import * as React from 'react';



import { ScrollView  } from 'react-native-gesture-handler'


const {width, height} = Dimensions.get('screen');
const win = Dimensions.get('window');
const ratio = 280/1124;

const images = {
    banner1: require('../../../../assets/images/banners/banner1.png') , banner2: require('../../../../assets/images/banners/banner2.png'), banner3: require('../../../../assets/images/banners/banner3.png'), banner4: require('../../../../assets/images/banners/banner2.png'), banner5: require('../../../../assets/images/banners/banner3.png')
  };
  
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
  }));

export default function Banners(){
    return (

      <FlatList
        style={{width}}
        data={data}
        horizontal
        bounces={false}
        scrollEnabled={true}
        showsHorizontalScrollIndicator = {false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => { 
          return ( 
            <Image source={item.image} style={{width: 280, height: 540 * ratio, marginTop: 12, marginBottom: 15, marginLeft: 15, marginRight: (item.key === 'banner5') ? 15 : 0}}/>
          )
        }}
        
      />
    )
}

const styles = StyleSheet.create({
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      width: 100,
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 15,
      marginRight: 15,
    },
  });
  
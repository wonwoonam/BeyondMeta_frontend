import {SafeAreaView,FlatList, TouchableOpacity, Text, StyleSheet, Image, View, Dimensions, MaskedViewComponent, Platform} from 'react-native'
import * as React from 'react';



import { ScrollView  } from 'react-native-gesture-handler'


const {width, height} = Dimensions.get('screen');

const images = {
    banner1: require('../../../../assets/images/artImage/image1.png'), 
    banner2: require('../../../../assets/images/artImage/image2.png'), 
    banner3: require('../../../../assets/images/artImage/image3.png'), 
    banner4: require('../../../../assets/images/artImage/image4.png'), 
    banner5: require('../../../../assets/images/artImage/image1.png')
  };
  
const data = Object.keys(images).map((i) => ({
    key: i,
    title: i,
    image: images[i],
  }));

export default function TopArt(){
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
            
            <View style={{marginLeft: 15, marginRight: 35}}>
                <View style= {{shadowColor: "black", shadowOffset: { height: 15, width: 17}, shadowOpacity: 0.2}}>
                  <Image source={item.image} style={{width: 220, height: 220, }}/>
                </View>
                <View style={{marginTop: 30 ,alignItems: 'center'}}>
                  <Text>Arabian Camel 94213</Text>
                  <Text>Arabian Camel</Text>
                  <Text>체결액: 1.324 KLAY</Text>
                </View>
            </View>
            
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
  
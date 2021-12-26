import React , {useEffect} from 'react';
import {ScrollView, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { View } from '../../../components/Themed';
import ArtWorks from './ArtWorks';


export default function All() {

    useEffect(() => {
        let isFetched = false;
        
        fetch('http://3.142.144.25:8080/users/' + global.userId, {
            method: 'GET',
            
        }).then((response) => response.json())
          .then((json) => { console.log(json)})
          .catch((error) => console.error(error))
         
        return () => {
            
            isFetched = true;
        };

      }, []);

    const {width, height} = Dimensions.get('screen');
    
    const getHeader = () => {
        return  <View>
                    <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
                    <Text style={{color:'#3E3E3E'}}> 총 241 작품</Text>
                    <TouchableOpacity
                        style={{
                                borderWidth:1,
                                marginRight: 15,
                                flexDirection: 'row', 
                                alignItems:'center',
                                borderRadius: 7,
                                padding: 4,
                                borderColor: '#C4C4C4'}}
                        
                    >
                        <Image source={require('../../../assets/icons/filter.png')} style={{resizeMode: 'contain',height: 15, width: 15}}/>
                        <Text style={{color:'#393939'}}>
                            필터
                        </Text>
                    </TouchableOpacity>
                    </View>  
                    <View 
                        style={{
                            borderBottomColor: '#ECECEC',
                            borderBottomWidth:1,
                            marginBottom: 25
                        }}
                    />

                </View>
    }

    const getFooter = () => {
        return <ArtWorks/>
    }


    return (

            <FlatList
                ListHeaderComponent = {getHeader}
                ListFooterComponent = {getFooter}
            />
        
            // <ScrollView showsHorizontalScrollIndicator={false} style={{backgroundColor:'white', width,height }}>
                
            //     <View style={{marginLeft: 15, marginTop: 15, marginBottom: 15, flexDirection: 'row', alignItems:'center', justifyContent:'space-between', flex:1}}>
            //         <Text style={{color:'#3E3E3E'}}> 총 241 작품</Text>
            //         <TouchableOpacity
            //             style={{
            //                     borderWidth:1,
            //                     borderColor: 'black',
            //                     marginRight: 15,
            //                     flexDirection: 'row', 
            //                     alignItems:'center',
            //                     borderRadius: 7,
            //                     padding: 4,
            //                     borderColor: '#C4C4C4'}}
                        
            //         >
            //             <Image source={require('../../../../assets/icons/filter.png')} style={{resizeMode: 'contain',height: 15, width: 15}}/>
            //             <Text style={{color:'#393939'}}>
            //                 필터
            //             </Text>
            //         </TouchableOpacity>
            //     </View>  
            //     <View 
            //         style={{
            //             borderBottomColor: '#ECECEC',
            //             borderBottomWidth:1,
            //             marginBottom: 25
            //         }}
            //     />
            //     <ArtWorks/>
                
            // </ScrollView>
       

    )
}
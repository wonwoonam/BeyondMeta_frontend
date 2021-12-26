import React, {useState} from 'react';
import { TouchableOpacity, Modal, View, Alert, Text, TextInput, Dimensions} from 'react-native'

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;

export default function ModalSingleTemplate(props){

    const [visibleVariable, setVisibleVariable] = useState(false)


    return(
        
        <View style={{height: screenHeight, width:screenWidth, backgroundColor:'rgba(39,39,39,0.73)', justifyContent:'center', alignItems:'center'}}>
            <View style={{width:screenWidth-120, justifyContent:'flex-start'}}>
                <View style={{paddingTop:40,paddingRight:40, paddingLeft:40, backgroundColor:'white', borderTopLeftRadius:7, borderTopRightRadius:7}}>
                    <Text style={{textAlign:'center', marginBottom:40}}>{props.mainText}</Text>
                </View> 


                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <View style={{flex:1, alignItems:'stretch'}}>
                        <TouchableOpacity
                            onPress={()=>{props.confirmAction()}}
                            style={{backgroundColor:'#50C878', paddingVertical:20, borderBottomLeftRadius:7}}
                        >
                            <Text style={{textAlign:'center', color:'white'}}>{props.confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
                
            
        </View>

        
    )

}
import { createStackNavigator } from '@react-navigation/stack';
import SendToken from './SendTokenPage'
import PaymentPage from './PaymentPage'
import * as React from 'react'

const StackL = createStackNavigator();
export default function SendTokenNavigator(){
    return(
      <StackL.Navigator>
        <StackL.Screen name="토큰 보내기" component={SendToken} options={{headerBackTitleVisible: false, headerTintColor:'#50C878'}}/>
        <StackL.Screen name="결제 하기" component={PaymentPage} options={{headerBackTitleVisible: false, headerTintColor:'#50C878'}}/>
      </StackL.Navigator>
    )

}
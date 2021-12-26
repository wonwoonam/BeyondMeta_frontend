import { createStackNavigator } from '@react-navigation/stack';
import PurchasePage from './Page'
import * as React from 'react'

const StackL = createStackNavigator();
export default function PurchaseNavigator(){
    return(
      <StackL.Navigator>
        <StackL.Screen
          name="결제하기"
          component={PurchasePage}
          options=
            {{
              headerBackTitleVisible: false, 
              headerTintColor:'#50C878'
            }}
          />
      </StackL.Navigator>
    )

}
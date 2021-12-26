import { createStackNavigator } from '@react-navigation/stack';
import SellToken from './Page'
import * as React from 'react'

const StackL = createStackNavigator();
export default function SellTokenNavigator(){
    return(
      <StackL.Navigator>
        <StackL.Screen 
          name="판매 하기" 
          component={SellToken} 
          options=
            {{
              headerBackTitleVisible: false, 
              headerTintColor:'#50C878'
            }}
          />
      </StackL.Navigator>
    )

}
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from './Page'
import * as React from 'react'
import PurchasePage from '../Purchase/Page'

const StackL = createStackNavigator();
export default function DetailNavigator(){
    return(
      <StackL.Navigator>
        <StackL.Screen 
          name="작품 상세" 
          component={DetailPage} 
          options=
            {{
              headerBackTitleVisible: false, 
              headerTintColor:'#50C878'
            }}
        />
        
      </StackL.Navigator>
    )

}
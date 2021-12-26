import { StatusBar } from 'expo-status-bar';

import React, {useState} from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import  AppLoading  from 'expo-app-loading';
import * as Font from 'expo-font';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';




global.loginStatus = false
global.userId = null


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  

  const fetchFonts = () => {
    return Font.loadAsync({
      'NotoSansKR-Bold': require('./assets/fonts/NotoSansKR-Bold.otf'),
      'NotoSansKR-Medium': require('./assets/fonts/NotoSansKR-Medium.otf'),
      'NotoSansKR-Regular': require('./assets/fonts/NotoSansKR-Regular.otf'),
      'Binggrae-Bold': require('./assets/fonts/Binggrae-Bold.ttf')
    });
  };

  const [fontloaded,setfontloaded]=useState(false);

  if(!fontloaded){
    

    return(
      <AppLoading
      startAsync={fetchFonts}
      onFinish={()=>{setfontloaded(true)}}
      onError={console.warn}/>
    )
  
  } else {
    return (
      <SafeAreaProvider>
        

        <StatusBar />
        <Navigation colorScheme={colorScheme} />
      </SafeAreaProvider>
    );
  }
}

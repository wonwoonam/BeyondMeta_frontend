/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
import { AntDesign, Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, {useState} from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabTwoScreen from '../screens/Save/TabTwoScreen';
import TabThreeScreen from '../screens/Search/TabThreeScreen';
import TopBarNavigatorWallet from '../screens/Wallet/TabFourScreen';
import TabFiveScreen from '../screens/Profile/TabFiveScreen';

import TopBarNavigator from '../screens/Home/TabOneScreen'

import { BottomTabParamList, TabOneParamList, TabTwoParamList, TabThreeParamList, TabFourParamList, TabFiveParamList } from '../types';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();




export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  


  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: '#50C878', showLabel: true }}
      >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneNavigator}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => {
            const image = focused
            ? require('../assets/icons/home-clicked.png')
            : require('../assets/icons/home-unclicked.png')
            return (
                <Image
                    source={image}
                    style={{height:24, width:24}}
                />
            )
        }
        }}
        //<Entypo name="heart-outlined" size={24} color="black" />
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoNavigator}
        options={{
          tabBarLabel: '저장',
          tabBarIcon: ({ focused }) => {
            const image = focused
            ? require('../assets/icons/save-clicked.png')
            : require('../assets/icons/save-unclicked.png')
            return (
                <Image
                    source={image}
                    style={{height:24, width:24}}
                />
            )
        }
        }}
        
      />
      <BottomTab.Screen
        name="TabThree"
        component={TabThreeNavigator}
        options={{
          tabBarLabel: '검색',
          tabBarIcon: ({ focused }) => {
            const image = focused
            ? require('../assets/icons/search-clicked.png')
            : require('../assets/icons/search-unclicked.png')
            return (
                <Image
                    source={image}
                    style={{height:24, width:24}}
                />
            )
        }
        }}
        
      />
      <BottomTab.Screen
        name="TabFour"
        component={TabFourNavigator}
        options={{
          tabBarLabel: '지갑',
          tabBarIcon: ({ focused }) => {
            const image = focused
            ? require('../assets/icons/wallet-clicked.png')
            : require('../assets/icons/wallet-unclicked.png')
            return (
                <Image
                    source={image}
                    style={{height:20, width:24}}
                />
            )
        }
        }}
        //<AntDesign name="smile-circle" size={24} color="black" />
      />
      <BottomTab.Screen
        name="TabFive"
        component={TabFiveNavigator}
        options={{
          tabBarLabel: '프로필',
          tabBarIcon: ({ focused }) => {
            const image = focused
            ? require('../assets/icons/profile-clicked.png')
            : require('../assets/icons/profile-unclicked.png')
            return (
                <Image
                    source={image}
                    style={{height:24, width:24}}
                />
            )
        }
        }}
        //<AntDesign name="smile-circle" size={24} color="black" />
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {

  

  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TopBarNavigator}
        options={{ 
          headerTitle: '픽클',
          headerTintColor: '#50C878',
          headerTitleStyle: {
              fontFamily: 'Binggrae-Bold',
              fontSize: 20}
        }}
        
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ 
          headerTitle: '저장',
          headerTintColor: '#50C878'
          }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();

function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator>
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{ 
          headerTitle: '검색',
          headerTintColor: '#50C878' 
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const TabFourStack = createStackNavigator<TabFourParamList>();

function TabFourNavigator() {
  return (
    <TabFourStack.Navigator>
      <TabFourStack.Screen
        name="TabFourScreen"
        component={TopBarNavigatorWallet}
        options={{ 
          headerTitle: '지갑',
          headerTintColor: '#50C878' 
        }}
      />
    </TabFourStack.Navigator>
  );
}

const TabFiveStack = createStackNavigator<TabFiveParamList>();

function TabFiveNavigator() {
  return (
    <TabFiveStack.Navigator>
      <TabFiveStack.Screen
        name="TabFiveScreen"
        component={TabFiveScreen}
        options={{ 
          headerTitle: '프로필' ,
          headerTintColor: '#50C878'
        }}
      />
    </TabFiveStack.Navigator>
  );
}

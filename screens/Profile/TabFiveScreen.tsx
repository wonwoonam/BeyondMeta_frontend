import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, Modal, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ModalTemplate from '../../navigation/ModalTemplate/Modal'

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import LoginAndRegisterModal from '../../navigation/Login/Page'

import { useIsFocused } from '@react-navigation/native';


const width = Dimensions.get('window').width;
const height = Dimensions.get('screen').height;

export default function TabFiveScreen() {




  const isFocused = useIsFocused();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
 
   
  
  


  function handleConfirm(){
  
      setLoginModalVisible(false)
      //resetAction()
  }

  function handleLogOut(){

    fetch('http://3.142.144.25:8080/users/logout', {
            method: 'POST'
            
        }).then((response) => response.json())
          .then((json) => {
              
            
          })
          .catch((error) => console.error(error))
  }

  function hideLogoutModal(){
    setLogoutModalVisible(false)
  
  }

  function continueLogout(){
    hideLogoutModal()
    handleLogOut()
   
    global.loginStatus = false
   
    
  }

  isFocused ? 'focused' : 'unfocused';
 
  console.log("final")
  if (!global.loginStatus){

    return(
      
      <View style={{alignItems:'center', justifyContent:'center', flex:1, backgroundColor: '#F2F2F2'}}>
        
        <Modal
            animationType="slide"
            transparent={true}
            visible={loginModalVisible}
            onRequestClose={() => {
                setLoginModalVisible(!loginModalVisible);
            }}
        >
            <SafeAreaView style={{height: height, width: width, backgroundColor:'white'}}>
                <View style={{alignItems:'flex-end', marginRight:20}}>
                    <TouchableOpacity onPress={() => handleConfirm()}>
                        <Text style={{fontSize:35}}>x</Text>
                    </TouchableOpacity>
                </View>
                <LoginAndRegisterModal handler={handleConfirm}/>
            </SafeAreaView>

        </Modal>


        <Text style={{paddingBottom:20}}>회원 정보가 없습니다.</Text>
        <TouchableOpacity 
            style={{backgroundColor: '#50C878', paddingHorizontal:30, paddingVertical:10, borderRadius:5}}
            onPress={()=> setLoginModalVisible(true)}>

            <Text style={{color:'white', fontWeight:'bold'}}>로그인</Text>
        </TouchableOpacity>
    </View>
    )
  }
 
  return (
    <View>
      <Modal
          animationType="none"
          transparent={true}
          visible={logoutModalVisible}
          onRequestClose={() => { setLogoutModalVisible(!logoutModalVisible)}}
      >
        <ModalTemplate mainText="로그아웃 하시겠습니까?" cancelText="취소" confirmText="확인" cancelAction={hideLogoutModal} confirmAction={continueLogout}/>
      </Modal>

      
      <View style={{alignItems:'center', marginVertical: 20}}>
        <Text style={{backgroundColor:'red'}}>Arabian Camel</Text>
        <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/fe58ace45deb82957a9d899de1fecbd4'}} style={{resizeMode: 'contain' ,height: 100, width: 100, marginVertical:10, borderRadius:200, justifyContent:'center'}}/>
        <TouchableOpacity style={{backgroundColor:'#50C878', paddingHorizontal:30, paddingVertical:5, borderRadius:5}}>
          <Text style={{color:'white', fontWeight: "bold", fontSize:13}}>프로필 편집</Text>
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor: '#D8D8D8', height:1, width:width}}/>
      <View style={{backgroundColor: '#F2F2F2', height:5, width:width}}/>

      <View style={{margin:20}}>
        <TouchableOpacity style={{marginBottom:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>고객센터</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>이용안내</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>약관 및 이용동의</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>회사소개</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:20}} onPress={()=>setLogoutModalVisible(true)}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>로그아웃</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{marginBottom:20}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text>회원 탈퇴</Text>
            <Text>></Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
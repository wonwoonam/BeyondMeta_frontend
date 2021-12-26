import React, {useState} from 'react';
import { TouchableOpacity, Modal, View, Alert, Text, TextInput} from 'react-native'

export default function LoginAndRegisterModal(props){


    const [emailTextInpt, onChangeEmailTextInpt] = useState('')
    const [pwTextInpt, onChangePwTextInpt] = useState('')
    const [modalStatus, onChangeModalStatus] = useState('login')

    const [regEmailTextInpt, onChangeRegEmailTextInpt] = useState('')
    const [regPwTextInpt, onChangeRegPwTextInpt] = useState('')
    const [regUsernameTextInpt, onChangeRegNameTextInpt] = useState('')



    function handleLoginAPICall(){
        let isFetched = false;
        fetch('http://3.142.144.25:8080/users/login', {
                                            method: 'POST',
                                            body: JSON.stringify({
                                                email: emailTextInpt,
                                                password: pwTextInpt
                                            }),
                                            headers: {
                                                'Accept':       'application/json',
                                                'Content-Type': 'application/json',
                                            }
                                        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){
                if(json.success == true){
                    global.loginStatus = true;
                    global.userId = json.user_id;
                    props.handler(true);
                    
                }else{
                    handleAlert()
                }
            }})
          .catch((error) => console.error(error))
          
        return () => {
        isFetched = true;
        
        
        };
    }

    function handleAlert(){
        Alert.alert(
            '입력한 정보가 일치하지 않습니다.',
            '',
            [
                {
                  text: "확인",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                
              ]
        )
    }


    function handleLogin(){
        if (emailTextInpt == "" || pwTextInpt ==""){
            handleAlert()
        }else{
            handleLoginAPICall()
        }
    }

    function handle(text){
        onChangeEmailTextInpt(text)
        console.log(emailTextInpt)
    }


    function LogInUI(){
        return(
            
            <View>
                <View style={{paddingHorizontal:30, paddingVertical:10}}>
                    <Text>이메일</Text>
                    <View style={{alignItems:'stretch', marginRight:10, }} >
                        <TextInput
                            style={{height: 40,
                                textAlign:'left',
                                borderBottomWidth:1,
                                borderBottomColor:'#A8A8A8',
                                padding: 10}}
                            onChangeText={onChangeEmailTextInpt}
                            value={emailTextInpt}
                            placeholder="가입한 이메일을 입력해 주세요."
                            placeholderTextColor = '#A0A0A0'
                            keyboardType='default'
                            returnKeyType='done'
                            clearButtonMode="always"
                        />
                    </View>
                </View>
                <View style={{paddingHorizontal:30, paddingVertical:10}}>
                    <Text>비밀번호</Text>
                    <View style={{alignItems:'stretch', marginRight:10}}>
                        <TextInput
                            style={{height: 40,
                                textAlign:'left',
                                borderBottomWidth:1,
                                borderBottomColor:'#A8A8A8',
                                padding: 10}}
                            onChangeText={onChangePwTextInpt}
                            value={pwTextInpt}
                            placeholder="비밀번호를 입력해 주세요."
                            placeholderTextColor = '#A0A0A0'
                            keyboardType='default'
                            returnKeyType='done'
                            clearButtonMode="always"
                        />
                    </View>
                </View>
                
                <View style={{ justifyContent:'center', margin:20}}>
                    <TouchableOpacity
                        onPress={() => handleLogin()}
                        style={{backgroundColor:'#50C878', paddingVertical:20, borderRadius:7}}
                    >
                        <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent:'center'}}>
                    <TouchableOpacity
                        onPress={() => onChangeModalStatus('register')}
                        style={{paddingVertical:20, borderBottomRightRadius:7, borderBottomLeftRadius:7}}
                    >
                        <Text style={{textAlign:'center', textDecorationLine:'underline'}}>회원가입</Text>
                    </TouchableOpacity>
                </View>        
            </View>
           
        )
    }

    function RegisterUI(){
        return(
            
                <View>
                    <View style={{paddingHorizontal:30, paddingVertical:10}}>
                        <Text>이메일</Text>
                        <View style={{alignItems:'stretch', marginRight:10}}>
                            <TextInput
                                style={{height: 40,
                                    textAlign:'left',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#A8A8A8',
                                    padding: 10}}
                                onChangeText={onChangeRegEmailTextInpt}
                                value={regEmailTextInpt}
                                placeholder="가입할 이메일을 입력해 주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='default'
                                returnKeyType='done'
                                clearButtonMode="always"
                            />
                        </View>
                    </View>
                    <View style={{paddingHorizontal:30, paddingVertical:10}}>
                        <Text>비밀번호</Text>
                        <View style={{alignItems:'stretch', marginRight:10}}>
                            <TextInput
                                style={{height: 40,
                                    textAlign:'left',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#A8A8A8',
                                    padding: 10}}
                                onChangeText={onChangeRegPwTextInpt}
                                value={regPwTextInpt}
                                placeholder="비밀번호를 입력해 주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='default'
                                returnKeyType='done'
                                clearButtonMode="always"
                            />
                        </View>
                    </View>

                    <View style={{paddingHorizontal:30, paddingVertical:10}}>
                        <Text>닉네임</Text>
                        <View style={{alignItems:'stretch', marginRight:10}}>
                            <TextInput
                                style={{height: 40,
                                    textAlign:'left',
                                    borderBottomWidth:1,
                                    borderBottomColor:'#A8A8A8',
                                    padding: 10}}
                                onChangeText={onChangeRegNameTextInpt}
                                value={regUsernameTextInpt}
                                placeholder="닉네임을 입력해 주세요."
                                placeholderTextColor = '#A0A0A0'
                                keyboardType='default'
                                returnKeyType='done'
                                clearButtonMode="always"
                                
                            />
                        </View>
                    </View>
                    
                    <View style={{ justifyContent:'center', margin:20}}>
                        <TouchableOpacity
                            onPress={() => handleLogin()}
                            style={{backgroundColor:'#50C878', paddingVertical:20, borderRadius:7}}
                        >
                            <Text style={{textAlign:'center', color:'white', fontWeight:'bold'}}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ justifyContent:'center'}}>
                        <TouchableOpacity
                            onPress={() => onChangeModalStatus('login')}
                            style={{paddingVertical:20, borderBottomRightRadius:7, borderBottomLeftRadius:7}}
                        >
                            <Text style={{textAlign:'center', textDecorationLine:'underline'}}>로그인</Text>
                        </TouchableOpacity>
                    </View>        
                </View>
           
        )
    }

    if(modalStatus == 'login'){
        return LogInUI()
    }else{
        return RegisterUI()
    }




}
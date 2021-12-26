import React, {useState, useEffect} from 'react';
import { StyleSheet, Image, FlatList, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { useHeaderHeight } from '@react-navigation/elements';


import { SearchBar } from 'react-native-elements';
import { template } from '@babel/core';

import ThemedDialog from 'react-native-elements/dist/dialog/Dialog';
import { Dimensions , StatusBar } from 'react-native';
import { Inter_600SemiBold } from '@expo-google-fonts/inter';

const screenHeight = Dimensions.get('screen').height;
const windowHeight = Dimensions.get('window').height;
const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;



export default class TabTwoScreen extends React.Component {
  isChanged = true
  state = {
    search: '',
    data: [],
    pad: 0,
    choice: 'artist',
    artistBcolr: 'white',
    artBcolr: '#DDDDDD',
    isChanged : true

  };


  updateColor(choice){
    console.log(choice)
    if (choice != this.state.choice){
      this.setState({data:[]})
    }
    this.setState({choice: choice})
    if (choice == 'artist'){
      this.setState({artistBcolr: 'white', artBcolr: '#DDDDDD'})
    }else{
      this.setState({artistBcolr: '#DDDDDD', artBcolr: 'white'})
    }
  }



  updateSearch = (search) => {
    this.setState({ search });
    this.setState({isChanged: !this.state.isChanged});
    let isFetched = false;
    if (search == ""){ 
      this.setState({data:[]});
      this.setState({pad:0})

    }else{
      console.log(search)
        fetch('http://3.142.144.25:8080/search/'+ search +'?option=' + this.state.choice, {
            method: 'GET',
        }).then((response) => response.json())
          .then((json) => {
            if(!isFetched){ this.setState({data:json}); console.log(this.state.data)}})
          .catch((error) => console.error(error))
          
        return () => {
        isFetched = true;
        this.setState({pad:0})
        
        };
    };
  };


  render() {
    const { search } = this.state;
    return (
      <View style={{flex:1}} >
        <SearchBar
          placeholder="키워드를 입력해 주세요"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme={true}
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainerStyle}
          showCancel={true}
          round={true}
          inputStyle={styles.inputStyle}
          platform={"ios"}
          autoCapitalize={'none'}
        />
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity style={{backgroundColor: this.state.artistBcolr, width: width/2, height:30, justifyContent:'center' }}
            onPress={() => this.updateColor('artist') }>
            
              <Text style={{textAlign:'center'}}>작가</Text>
            
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: this.state.artBcolr, width: width/2, height:30, justifyContent:'center' }}
            onPress={() => this.updateColor('title')}>
          
              <Text style={{textAlign:'center'}}>작품</Text>
            
          </TouchableOpacity>
        </View>
        
        <FlatList
            bounces = {true}
            data = {this.state.data}
            extraData={this.state.isChanged}
            keyExtractor={(item, index) => item.key} 
            
            //ListHeaderComponent = {this.getHeader}
            //ListFooterComponent = {getFooter}
            renderItem={({item}) => { 

              if (this.state.choice == "title"){
                return(
                  <TouchableOpacity
                    onPress={()=> this.props.navigation.navigate("DetailPage", {screen: "작품 상세", params:{artWorkDetail:item, key: "search"}})}
                  >
                    
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
                        <Text style={{fontSize:12, marginRight:40}}>{item.title}</Text>
                        <Text style={{fontSize:12}}>{item.price_klay} Klay</Text>
                      </View>
                      <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+item.img}} style={{resizeMode: 'contain' ,height: 50, width: 50, marginRight:20, marginVertical:10, justifyContent:'center'}}/>
                    </View>
                    <View 
                        style={{
                            borderBottomColor: '#ECECEC',
                            borderBottomWidth:1
                        }}
                    />
                  
                  </TouchableOpacity>
                )
              }else{
                return(
                  <TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
                        <Text style={{fontSize:12, marginRight:40}}>{item.username}</Text>
                      </View>
                      <Image source={{uri: 'http://3.142.144.25:8080/images/thumbnail/'+item.user_img}} style={{resizeMode: 'contain' ,height: 50, width: 50, marginRight:20, marginVertical:10, justifyContent:'center'}}/>
                    </View>
                    <View 
                        style={{
                            borderBottomColor: '#ECECEC',
                            borderBottomWidth:1
                        }}
                    />
                  
                  </TouchableOpacity>
                )
              }
            }
            }
        />
      </View>
    );
  }
}




/*
export default function TabTwoScreen() {
  

  var search = ''
  const [data, setData] = useState([])
  

  function doSearch(search){
    
    let isFetched = false;
    console.log(search)
      fetch('http://3.142.144.25:8080/search/'+search+'?option=title', {
          method: 'GET',
          
      }).then((response) => response.json())
        .then((json) => {
          if(!isFetched){ setData(json)}})
        .catch((error) => console.error(error))
        
      return () => {
      isFetched = true;
      };
  };

  return (
    <SearchBar
      placeholder="키워드를 입력해 주세요"
      onChangeText={()=>doSearch}
      value={search}
      lightTheme={true}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainerStyle}
      showCancel={true}
      round={true}
      inputStyle={styles.inputStyle}
      
    />
  );
}
*/

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 50
  },
  inputContainerStyle:{
    height:30,
    marginHorizontal:10,
    backgroundColor: 'white',
    borderColor:'#C1C1C1',
    borderWidth: 1,
    borderBottomWidth:1
  },
  inputStyle:{
    fontSize:12,
   

  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
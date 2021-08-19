import React, { Component } from 'react';
import {View,Text, KeyboardAvoidingView,TextInput,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import MyHeader from '../components/MyHeader'
import db from '../config'
import firebase from 'firebase'

export default class SettingScreen extends Component{
  constructor(){
    super();
    this.state={
      emailId:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      docId:''
    }
  }

 getData(){
  var user = firebase.auth().currentUser;
  var email= user.email

 db.collection('users').where('emailId','==',email).get()
  .then(snapshot => {
    snapshot.forEach(doc => {
       var data = doc.data()
       this.setState({
         emailId: data.username,
         firstName:data.first_name,
         lastName:data.last_name,
         address:data.address,
         contact:data.mobile_number,
         docId:doc.id
       })
    });
  })

}

 updateData(){

  db.collection('users').doc(this.state.docId)
    .update({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      address:this.state.address,
      contact:this.state.contact,
    })
}

componentDidMount(){
  this.getData()
}



    render(){
        return(

              <View style={{flex:1, alignItems: 'center',justifyContent: 'center'}} >
                <MyHeader title="Settings" navigation ={this.props.navigation}/>
                <View style={{flex:1,width:'100%',alignItems: 'center'}}>

                <View style={styles.formContainer}>
        <Text style= {{marginRight:240,marginTop:30,fontWeight:'bold'}}>First Name</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder ={"First Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      firstName: text
                    })
                  }}
                  value ={this.state.firstName}
                />
                 <Text style= {{marginRight:240,marginTop:15,fontWeight:'bold'}}>Last Name</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder ={"Last Name"}
                  maxLength ={8}
                  onChangeText={(text)=>{
                    this.setState({
                      lastName: text
                    })
                  }}
                    value ={this.state.lastName}
                />
                  <Text style= {{marginRight:240,marginTop:15,fontWeight:'bold'}}>Contact No.</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder ={"Contact"}
                  maxLength ={10}
                  keyboardType={'numeric'}
                  onChangeText={(text)=>{
                    this.setState({
                      contact: text
                    })
                  }}
                    value ={this.state.contact}
                />
                <Text style= {{marginRight:260,marginTop:15,fontWeight:'bold'}}>Address</Text>
                <TextInput
                  style={styles.modalTextInput}
                  placeholder ={"Address"}
                  multiline = {true}
                  onChangeText={(text)=>{
                    this.setState({
                      address: text
                    })
                  }}
                    value ={this.state.address}
                />
  
                
                <TouchableOpacity style={styles.button}
                  onPress={()=>{this.updateData()}}>
                      <Text style={styles.buttonText}>Update My Details</Text>
                </TouchableOpacity>
                </View>

              </View>
              </View>





        )
    }
}


const styles = StyleSheet.create({
    modalTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#0e5da2',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    formContainer: {
      flex: 1,
      width: '100%',
      alignItems: 'center'
    },
    button:{
        width:"75%",
        height:50,
        justifyContent:'center',
        alignItems:'center',
        // alignSelf: 'center',
        borderRadius:10,
        backgroundColor:"#0e5da2",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop:20
      },
      buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff"
      }

}
)
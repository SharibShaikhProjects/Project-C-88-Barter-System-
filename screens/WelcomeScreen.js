import React from "react";
import { TouchableOpacity, StyleSheet, Text, View, TextInput, Alert, Image, ScrollView, KeyboardAvoidingView, Modal, } from "react-native";
import db from '../config'
import firebase from "firebase";

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();

    //Creating Empty String For The EmailID, Password And Other User Details
    this.state = {
      emailId: '',
      password: '',
      isModalVisible: false,
      firstName: "",
      lastName: "",
      mobileNumber: "",
      address: "",
      confirmPassword: "",
      currencyCode: ""
    };
  }


  //Login Function
  userLogin = (emailId, password) => {
    firebase.auth()  .signInWithEmailAndPassword(emailId, password)
      .then(() => {
        this.props.navigation.navigate('HomeScreen')
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      })
  }

  //Registration Function
  userSignUp = (emailId, password, confirmPassword) => {
    if (password !== confirmPassword) {
      return Alert.alert("password doesn't match\nCheck your password.")
    } else {
      firebase.auth().createUserWithEmailAndPassword(emailId, password)
        .then((response) => {
          db.collection('users').add({
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            mobile_number: this.state.mobileNumber,
            emailId: this.state.emailId,
            address: this.state.address,
            currency_code: this.state.currencyCode
          })
          return Alert.alert(
            'User Added Successfully',
            '',
            [
              { text: 'OK', onPress: () => this.setState({ "isVisible": false }) },
            ]
          );
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert(errorMessage)
        });
    }

  }

  //Creating The "showmodal" Function"
  showmodal = () => {
    return (

      //Modal Properties And Styling
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isModalVisible}
      >
        {/* Modal Styling */}

        <View style={styles.modalcontainer}>

          {/*Creating The ScrollView For The Modal */}

          <ScrollView style={{ width: "100%" }}>

            {/*Creating A Keyboard Avoiding View For The Modal */}

            <KeyboardAvoidingView
              style={{ justifyContent: "center", alignItems: "center", }}>

              {/*Creating The Header For The Modal
              
                <TouchableOpacity

                onPress={() => {
                  this.setState({ isModalVisible: false });
                }}>

                <Image
                  source={require("../assets/cross1.png")}
                  style={{ width: 40, height: 40,}}
                />
                
        
              </TouchableOpacity>
              
              
              */}


              <Text style={styles.modalHeader}>Registration</Text>

              {/*Text Input For Writing The "First Name" In The Modal 
              
               
              */}

<TextInput
              style={styles.modalTextInput}
              placeholder={"First Name"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  firstName: text
                })
              }}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={"Last Name"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  lastName: text
                })
              }}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={"Mobile Number"}
              maxLength={10}
              keyboardType={'numeric'}
              onChangeText={(text) => {
                this.setState({
                  mobileNumber: text
                })
              }}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={"Address"}
              multiline={true}
              onChangeText={(text) => {
                this.setState({
                  address: text
                })
              }}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={"Email ID"}
              keyboardType={'email-address'}
              onChangeText={(text) => {
                this.setState({
                  emailId: text
                })
              }}
            /><TextInput
              style={styles.modalTextInput}
              placeholder={"Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  password: text
                })
              }}
            /><TextInput
              style={styles.modalTextInput}
              placeholder={"Confrim Password"}
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({
                  confirmPassword: text
                })
              }}
            />
            <TextInput
              style={styles.modalTextInput}
              placeholder={"Country currency code"}
              maxLength={8}
              onChangeText={(text) => {
                this.setState({
                  currencyCode: text
                })
              }}
            />
            </KeyboardAvoidingView>

            {/*Creating The Register Button For The Modal */}

            <TouchableOpacity
              style={styles.modalRegisterButton}
              onPress={() => {
                this.userSignUp(
                  this.state.emailId,
                  this.state.password,
                  this.state.confirmPassword
                );
                this.setState({ isModalVisible: false });
              }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>Register</Text>
            </TouchableOpacity>

            {/*Creating The Cancel Button For The Modal */}

            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 20, }}>Cancel</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </Modal>
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {this.showmodal()}
        </View>

        {/* Title Image For The App */}

        <Image
          source={require("../assets/AppIcon.png")}
          style={{ width: 250, height: 250, marginTop: -100, justifyContent: 'center', alignContent: 'center' }}
        />

        {/*Title For The App */}




        {/*Creating The Text Input For Entering The "Email ID" for Login */}
        <Text style={{ fontWeight: 'bold', marginRight: 240 }}>EMAIL</Text>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Enter Your Email ID"
          keyboardType="email-address"
          onChangeText={(text) => {
            this.setState({
              emailId: text,
            });
          }}
        />

        {/*Creating The Text Input For Entering The "Password" for Login */}
        <Text style={{ fontWeight: 'bold', marginRight: 210 }}>PASSWORD</Text>
        <TextInput
          style={styles.loginTextInput}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({
              password: text,
            });
          }}
        />

        {/*Creating The "Login" Button For Logging The User */}

        <TouchableOpacity
          style={styles.LoginAndSignUpButton}
          onPress={() => {
            this.userLogin(this.state.emailId, this.state.password);
          }}>

          <Text style={{ fontSize: 20, color: "white", }}>Login</Text>

        </TouchableOpacity>

        {/*Creating The "SignUp" Button For Logging The User */}

        <Text style={{ marginTop: 20, color: "black", fontSize: 17 }}>Don't Have An Account</Text>

        <TouchableOpacity
          style={styles.SignUpButton}
          onPress={() => {
            this.setState({ isModalVisible: true });
          }}>
          <Text style={{ fontSize: 20, color: "white", }}>Create An Account</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },

  modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginRight: 30,
    marginLeft: 30,
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    borderRadius: 20,
  },

  modalHeader: {
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: 30,
    color: "#0e5da2",
    margin: 30,
    marginTop: 30,


  },

  modalTextInput: {
    width: "75%",
    height: 35,
    alignSelf: "center",
    borderColor: "#0e5da2",
    borderWidth: 5,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
    padding: 10,
  },

  modalRegisterButton: {
    width: 180,
    height: 50,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: "#0e5da2",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 16,
    padding: 10,
  },

  modalCancelButton: {
    width: 180,
    height: 50,
    marginTop: 20,
    alignContent: 'center',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    borderRadius: 25,
    backgroundColor: "#0e5da2",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 20,
    },
    elevation: 16,
    padding: 10,
  },

  loginTextInput: {
    width: 300,
    height: 40,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#0e5da2",
    fontSize: 20,
    margin: 20,
    paddingLeft: 10,
    marginLeft: 35,
    marginTop: 10,
  },

  LoginAndSignUpButton: {
    width: 180,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0e5da2",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,
    marginTop: 20,

  },
  SignUpButton: {
    width: 280,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#0e5da2",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
    padding: 10,


  }

});

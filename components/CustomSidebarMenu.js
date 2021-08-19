import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import firebase from "firebase";
import db from "../config";
import { Icon } from "react-native-elements";

import { RFValue } from "react-native-responsive-fontsize";

export default class CustomSideBarMenu extends Component {
  state = {
    userId: firebase.auth().currentUser.email,
    image: "#",
    name: "",
    docId: "",
  };

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
            quality: 1,
            borderRadius: 20
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userId);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child("user_profiles/" + imageName);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: "#" });
      });
  };

  getUserProfile() {
    db.collection("users")
      .where("email_id", "==", this.state.userId)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.setState({
            name: doc.data().first_name + " " + doc.data().last_name,
            docId: doc.id,
            image: doc.data().image,
          });
        });
      });
  }

  componentDidMount() {
    this.fetchImage(this.state.userId);
    this.getUserProfile();
  }

  render() {
    return (
      <View style={{ flex: 1, }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: "center",
           
          }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size={"xlarge"}
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />

          <Text
            style={{
              fontWeight: "300",
              fontSize: RFValue(20),
              color: "#fff",
              padding: RFValue(10),
            }}
          >
            {this.state.name}
          </Text>
        </View>
        <View style={{ flex: 0.6 }}>
          <DrawerItems {...this.props} />
        </View>

                <View style={styles.logoutcontainer}>
                    <TouchableOpacity style={styles.logoutbox}
                        onPress={
                            () => {
                                this.props.navigation.navigate('WelcomeScreen')
                                firebase.auth().signOut()
                            }
                        }>
                      
                  <View style={{flexDirection:'row'}}>
                  <Text style={styles.logouttext}>Logout</Text>
                   <Icon
                           
                            name="logout"
                            type='antdesign'
                            size={RFValue(20)}
                            iconStyle={{ paddingLeft: RFValue(10) }}
 
                        />
                       
                       </View>
                    </TouchableOpacity>

                       

                </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer: {
    flex: 0.8,
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    paddingBottom: 30,
    flexDirection: "row",
  },
  logOutButton: {
    height: 30,
    width: "85%",
    justifyContent: "center",
    padding: 10,
  },
  logouttext: {
    fontSize: 15,
    color: '#09a6e3',
    fontWeight: 'bold'
},
  imageContainer: {
    flex: 0.75,
    width: "40%",
    height: "20%",
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
  logOutText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logoutcontainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    paddingBottom: 30
},
logoutbox: {
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    //borderRadius: 10,
    //marginTop: 30,
    marginLeft: 40,
    backgroundColor: "white",
   
},
logouttext: {
    fontSize: 15,
    color: '#0e5da2',
    fontWeight: 'bold'
},
imageContainer: {
    flex: 1.5,
    width: "90%",
    // height: '100%',
    //marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
    marginTop: 20
},
imageContainer: {
  flex: 2,
  width: "93%",
  // height: '100%',
  //marginLeft: 20,
  marginTop: 30,
  borderRadius:30,
  marginTop: 20
},
});

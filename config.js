import * as firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
  apiKey: "AIzaSyA1kelyKuj6AhKRo6C8lwoLzp2FYfUgBgE",
  authDomain: "project76-barter-system-app.firebaseapp.com",
  projectId: "project76-barter-system-app",
  storageBucket: "project76-barter-system-app.appspot.com",
  messagingSenderId: "368273858022",
  appId: "1:368273858022:web:1e2b95d98d279ad5c68a27"
};
  // Initialize Firebase
//  if(!firebase.apps.length){
firebase.initializeApp(firebaseConfig);
// }

export default firebase.firestore();

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

var firebaseConfig = {
    apiKey: "AIzaSyBkrMYcTX_d_K8SF-bFjpSFWNRTx6-jAcc",
    authDomain: "dailee-f3d58.firebaseapp.com",
    projectId: "dailee-f3d58",
    storageBucket: "dailee-f3d58.appspot.com",
    messagingSenderId: "903265997201",
    appId: "1:903265997201:web:ea526b1fb4f9c122608a30"
}
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const auth = firebase.auth();

export { auth, firestore}
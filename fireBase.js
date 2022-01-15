var fireBase = fireBase || firebase;
var hasInit = false;
const firebaseConfig = {
  apiKey: "AIzaSyBIVgnaw83MSmf7iWwq58ih9E2r3lA8ydY",
  authDomain: "sustain-f115c.firebaseapp.com",
  databaseURL: "https://sustain-f115c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sustain-f115c",
  storageBucket: "sustain-f115c.appspot.com",
  messagingSenderId: "748836738977",
  appId: "1:748836738977:web:d141a0d00d0e71db271de0",
  measurementId: "G-NFKDFB01RK"
};

// Initialize Firebase
if(!hasInit){
    firebase.initializeApp(firebaseConfig);
    hasInit = true;
}



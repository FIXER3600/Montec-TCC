  
//https://firebase.google.com/docs/web/setup?hl=pt-br
// Initialize Firebase

document.addEventListener("deviceready", function() {
  var firebaseConfig = {
    apiKey: "AIzaSyD2dmK_FvPyNOT-OgnWSw5ycVk0Bym4cAY",
    authDomain: "montectcc.firebaseapp.com",
    databaseURL: "https://montectcc.firebaseio.com",
    projectId: "montectcc",
    storageBucket: "montectcc.appspot.com",
    messagingSenderId: "676436694770",
    appId: "1:676436694770:web:7bb4dfffa6aad44415e26b",
    measurementId: "G-ZHMC7957X6"
  };
    firebase.initializeApp(firebaseConfig);
}, false);




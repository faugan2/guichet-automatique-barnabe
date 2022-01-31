
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQzldvyFgjBVWt6hJHcNvx8ugt-NYipcM",
    authDomain: "guichet-automatique.firebaseapp.com",
    projectId: "guichet-automatique",
    storageBucket: "guichet-automatique.appspot.com",
    messagingSenderId: "900328349563",
    appId: "1:900328349563:web:ed5d7c8090d0c655eaa7de"
  };


  let app;
  if(firebase.apps.length==0){
    app=firebase.initializeApp(firebaseConfig);
  }else{
    app=firebase.app();
  }
  
  
  const auth=app.auth();
  const db=app.firestore();
  const storage=app.storage();
  
  
  
  
  export {auth,db,storage};
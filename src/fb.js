import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyAKXtWNUd76N59k1KfbfNu6gI967eBgaUs",
    authDomain: "ipt2quizappproject.firebaseapp.com",
    projectId: "ipt2quizappproject",
    storageBucket: "ipt2quizappproject.appspot.com",
    messagingSenderId: "617772258585",
    appId: "1:617772258585:web:ef2d76d81b36366f7a6188",
    measurementId: "G-1JJJZLTQ4M"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true})
  export default db;

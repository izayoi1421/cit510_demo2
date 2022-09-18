import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKXtWNUd76N59k1KfbfNu6gI967eBgaUs",
  authDomain: "ipt2quizappproject.firebaseapp.com",
  projectId: "ipt2quizappproject",
  storageBucket: "ipt2quizappproject.appspot.com",
  messagingSenderId: "617772258585",
  appId: "1:617772258585:web:ef2d76d81b36366f7a6188",
  measurementId: "G-1JJJZLTQ4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export{
  db
}
loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')

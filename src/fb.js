import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { ref, onUnmounted } from 'vue'
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

  const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
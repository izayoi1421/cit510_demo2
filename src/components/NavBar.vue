<template>
  <nav v-if="isLoggedIn">
      <v-toolbar app color="#D8FFF8">
       <v-app-bar-nav-icon @click='toggleDrawer'></v-app-bar-nav-icon>
      <v-toolbar-title >
        <span>Naguit Project</span>

      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- dropdown menu -->
    <v-menu
      open-on-hover
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Dropdown
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          router
          :to="item.path" :prepend-icon="item.icon">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn
          color="error"
          @click="handleSignOut"
          v-if="isLoggedIn"
        >
          Sign Out
        </v-btn>
      
      
      </v-toolbar>

     <v-navigation-drawer app v-model="drawer">
      <router-link to="/aboutme" class="rlink">
        <v-card-text class="abtme"><img class="myimage" src="/Naguit.png" alt="My Picture"> Christian Dave C. Naguit</v-card-text>
      </router-link>
      
       <v-list-item
          v-for="item in items"
          :key="item.title"
          router 
          :to="item.path" :prepend-icon="item.icon">
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      
     </v-navigation-drawer>
  </nav>
</template>

<style scoped>
.nav{
  background-color: #D8FFF8;
}
.abtme{
  color: white;
  background-color: rgb(37, 37, 37) ;
}
.rlink{
  background-color: black;
}
a {
  text-decoration: none; 
}
a {
    text-decoration: none;
}

a:hover {
    text-decoration:none; 
    cursor:pointer;  
}
a:visited{ color: black }
.myimage{
     height: 40px;
     width: 40px;
     border-radius:70px;
     vertical-align:middle;
}
</style>

<script setup>
  import { ref } from 'vue'
  import { onMounted } from 'vue';
  import { getAuth, onAuthStateChanged, signOut} from "firebase/auth"
  import { useRouter} from 'vue-router';
  const router = useRouter();
  const drawer = ref(false);

  const  items =  ref([
           { title: 'Dashboard', icon: 'mdi-view-dashboard', path: '/home' },
           { title: 'Simple Calculator', icon: 'mdi-calculator-variant', path: '/basicMath' },
           { title: 'Vowel Count', icon: 'mdi-help-box', path: '/stringApp'},
           { title: 'About Vuetify', icon: 'mdi-vuetify', path: '/aboutVuetify'},
           { title: 'Quiz', icon:'mdi-alpha-q-box-outline', path: '/axiosQuiz'},
           { title: 'About Project', icon:'mdi-clipboard-clock-outline', path: '/aboutProject'},
        ])

 function toggleDrawer(){
  return drawer.value = !drawer.value
 }
 const isLoggedIn = ref(false);
 let auth;
 onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user)=> {
    if(user) {
      isLoggedIn.value = true;
    } else{
      isLoggedIn.value = false;
    }
  });
 });
 const handleSignOut = () => {
  signOut(auth).then(()=>{
    router.push("/");
  });
 };

 
</script>
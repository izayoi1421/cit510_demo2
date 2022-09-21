import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";

import BasicMathView from '../views/BasicMathView.vue'
import StringAppView from '../views/StringAppView.vue'
import HomeView from '../views/HomeView.vue'
import AboutMeView from '../views/AboutMeView.vue'
import AxiosTriviaQuiz from '../views/AxiosTriviaQuiz.vue'
import AboutVuetify from '../views/AboutVuetify.vue'
import AboutProject from '../views/AboutProject.vue'
import Register from '../views/Register.vue'
import SignIn from '../views/SignIn.vue'
import MakeAdmin from '../views/MakeAdmin.vue'
import Test from '../views/Test.vue'
import Home from '@/views/Home.vue'
import Edit from '@/views/Edit.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'signIn',
      component: SignIn,
      meta:{
        requiresAuth: false,
      },
    },
    {
      path: '/stringApp',
      name: 'StringAppView',
      component: StringAppView,
      meta:{
        requiresAuth: true,
      },
    },
    {
    path: '/basicMath',
    name: 'basicMath',
    component: BasicMathView,
    meta:{
      requiresAuth: true,
    },
    },
    {
      path: '/aboutMe',
      name: 'aboutMe',
      component: AboutMeView,
      meta:{
        requiresAuth: true,
      },
      },
      {
        path: '/axiosQuiz',
        name: 'axiosQuiz',
        component: AxiosTriviaQuiz,
        meta:{
          requiresAuth: true,
        },
      },              
      {
        path: '/aboutVuetify',
        name: 'aboutVuetify',
        component: AboutVuetify,
        meta:{
          requiresAuth: true,
        },
      },              
      {
        path: '/aboutProject',
        name: 'aboutProject',
        component: AboutProject,
        meta:{
          requiresAuth: true,
        },
      },    
    {         
      path: '/register',
      name: 'register',
      component: Register,
      meta:{
        requiresAuth: false,
      },
    },              
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta:{
        requiresAuth: true,
      },
    },    
    {
      path: '/makeAdmin',
      name: 'makeAdmin',
      component: MakeAdmin,
    },    
    {
      path: '/test',
      name: 'test',
      component: Test,
    },    
    {
      path: '/crud',
      name: 'Home',
      component: Home
    },
    {
      path: '/edit/:id',
      name: 'Edit',
      component: Edit
    },
  ]
})
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject  
    );
  });
};
router.beforeEach(async(to,from,next)=>{
  if(to.matched.some((record)=> record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next();
    } else {
      alert("you don't have access here!");
      next("/");
    }
  }else{
    next();
  }
});
export default router

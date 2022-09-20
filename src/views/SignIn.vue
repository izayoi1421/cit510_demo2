<template>
    <v-row class="vrow" v-if="!isLoggedIn">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
            <v-card class="ma-15" ref="form">
                <v-card-text>
                    <v-card-title class="logintitle"><h1>Log In</h1></v-card-title>
                    <v-text-field
                        v-model="email"
                        :error-messages="errorMessages"
                        label="Enter Email"
                        placeholder="Email"
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="password"
                        type="password"
                        :error-messages="errorMessages"
                        label="Enter Password"
                        placeholder="Password"
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="vcardaction">
                    <span style="padding-left:60px;padding-bottom:15px;">
                        <v-btn type="text" rounded color="#00539CFF" class="btn" @click="signin">Sign In</v-btn>
                    </span>
                    <v-spacer></v-spacer>
                    <span style="padding-right:60px;padding-bottom:15px;">
                        <router-link to="/register" style="text-decoration: none;">
                            <v-btn type="text" rounded color="#00539CFF" class="btn">Go to Registration</v-btn>    
                        </router-link>
                    </span>
                </v-card-actions>
                
                
            </v-card>
        </v-col>
    </v-row>
  </template>
  
  

    <style scoped>
    
    .vrow {
         justify-content: center;
         margin-right: 55%;
         padding-left: 5%;
         height: 101%;
         width: 105%;
         font-size: 15px;
         font-weight: 200;
         background-image: url("/loginBG3.jpg");
         background-size: cover;
    }
    .vcard{
      border-radius:50px;
    }
    .vcardaction {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .ma-15{
    justify-content: center;
      width:400px;
      border-radius:50px;
      padding-top: 20px;
      background-color:rgba(128, 170, 247, 0.897) ;
      margin-top:50%;
    }
    .btn{
        background:rgba(238, 164, 127, 0.548);
    }
    </style>

<script setup>
    import {ref} from "vue";
    import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
    import { useRouter} from 'vue-router' 
    const email = ref("");
    const password = ref("");
    const errMsg  = ref()
    const router = useRouter();
    const signin = () => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((data) => {
                console.log("Successfully Sign In!");
    
                console.log(auth.currentUser)
                router.push('/home')
            })
            .catch((error) => {
                console.log(error.code);
                switch (error.code){
                  case "auth/invalid-email":
                      errMsg.value = "Invalid Email";
                  break;
                  case "auth/user-not-found":
                      errMsg.value = "No Account With that Email was found";
                  break;
                  case "auth/wrong-password":
                      errMsg.value = "Incorrect Password";
                  break;
                  default:    
                      errMsg.value = "Email or Password is Incorrect";
                  break;
                }
                alert(error.message);   
            });
    };
    

    </script>
<template>
  <v-row class="vrow">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="ma-15" ref="form">
        <v-card-text>
          <v-card-title class="logintitle"
            ><h1>Create Account</h1></v-card-title
          >
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
          <span style="padding-left:20px;padding-bottom:15px;">
            <v-btn
              type="text"
              rounded
              color="#00539CFF"
              class="btn"
              @click="signin"
              >Register</v-btn
            >
          </span>
          <span style="padding-right:20px;padding-bottom:15px;">
            <router-link to="/"  style="text-decoration: none;">
              <v-btn type="text" rounded color="#00539CFF" class="btn">Go to Sign In</v-btn>    
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
  margin-right: 50%;
  padding-left: 5%;
  height: 101%;
  width: 105%;
  font-size: 15px;
  font-weight: 200;
  background-image: url("/loginBG3.jpg");
  background-size: cover;
}
.vcard {
  border-radius: 50px;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ma-15 {
  border-radius: 50px;
  padding-top: 20px;
  background-color: rgba(128, 170, 247, 0.897);
  margin-top: 50%;
}
.btn {
  background: rgba(238, 164, 127, 0.548);
}
</style>
<script setup>
import { ref } from "vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const router = useRouter();

const register = () => {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Successfully Registered!");

      console.log(auth.currentUser);
      router.push("/home");
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message);
    });
};

</script>


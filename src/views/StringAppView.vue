<template>
<v-row class="vrow">
     <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >     
 <v-card
    class="ma-15"
    max-width="600"
    color="#D8FFF8"
 >

  <v-card-title> Vowel Counting </v-card-title>

   <v-text-field label="Enter a String" v-model="stringInput"></v-text-field>
   <v-card-actions class="vcardaction">
     <v-btn class="btn" @click="doCountVowel">Count Vowel</v-btn>
    </v-card-actions>
   <v-divider class="mt-12"></v-divider>
        <v-card-text>
 <p>Number: {{numberCount}}</p>
 <p>Vowel: {{vowelCount}}</p> 
 <p>Consonant: {{consonantCount}}</p>
 <p>Convert Vowels to "*": {{convertCount}}</p>
   </v-card-text>
     <v-card-actions class="vcardaction">

   </v-card-actions>
 </v-card>  
 </v-col>
</v-row>
</template>
<style scoped>
.ma-15{
  border-radius:50px;
  padding-top: 25px;
}
.vrow {
     justify-content: center;
     margin-right: 50%;
     
     height: 100%;
     width: 100%;
     font-size: 15px;
     font-weight: 600;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
     background-color: #1520A6;
     color:aliceblue;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<script setup>
import {ref} from 'vue'

const stringInput = ref('')
const vowelCount = ref(0)
const numberCount = ref(0)
const consonantCount = ref(0)
const convertCount = ref(0)

function doCountVowel () {
     numberCount.value = stringInput.value.match(/[0-9]/gi).length;
     vowelCount.value = stringInput.value.match(/[aeiou]/gi).length;
     consonantCount.value = stringInput.value.match(/[bcdfghjklmnpqrstvwxys]/gi).length;
     convertCount.value = stringInput.value.replace(/[aeiouAEIOU]/gi,'*');
     return; 
}

</script>



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
        style="background-color: rgba(19, 62, 124, 0)"   
     >
    
      <v-card-title style="text-align:center"> Vuetify </v-card-title>
              <img class="vuetify" src="/vuetifylogo.png" alt="vuetify" width="100" height="100">
              <h1 style="text-align:center">Material Design Framework</h1>
               <p style="text-align:center" color="#D8FFF8">
               Vuetify is a Vue UI Library with beautifully handcrafted Material Components. 
               No design skills required — everything you need to create amazing applications is 
               at your fingertips.
              </p>      
     </v-card>  
     </v-col>
    </v-row>
    </template>
    <style scoped>
    
     
    .ma-15{
     height: 420px;
     width: 550px;
     padding: 25px;
     margin-bottom: 100px;
}
.vrow {
  margin-right: 50%;
     padding-left: 20% ;
     padding-top: 4% ;
     height: 98%;
     width: 101% ;
     font-size: 10px;
  background-image: url("aboutpages.png");
  background-size: cover;
}
    .vuetify{
         height: 250px;
         width: 250px;
         border-radius:70px;   
         margin-left: 28%;
    }
    .center {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
      height: 100%;
    }
    </style>
    <script setup>
    
    </script>
    
    
    
    
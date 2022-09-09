

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
    
    .vrow {
         justify-content: center;
         margin-right: 50%;
         height: 100%;
         width: 100%;
         font-size: 15px;
         font-weight: 600;
         
    }
    .ma-15{
         background-color: #D8FFF8;
         border-radius:50px;
         height: 470px;
         width: 600px;
         padding: 20px;
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
    
    
    
    
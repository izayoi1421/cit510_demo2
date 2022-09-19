<template>
    <v-row class="vrow">
        <v-col
          cols="12"
          sm="10"
          md="8"
          lg="6"
        >
            <v-card class="ma-15" ref="form" color="#D8FFF8">
                <v-card-text>
                    <v-card-title><h2>Make Admin</h2></v-card-title>
                    <v-text-field
                        v-model="email"
                        :error-messages="errorMessages"
                        label="Enter Email"
                        placeholder="Email"
                        id="admin-email"
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions class="vcardaction">
                    <v-btn type="text" rounded color="#00539CFF" class="btn" @click="assignAdmin">Make Admin</v-btn>
                    
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
  </template>
  
<script setup>
   


    
</script>

    <style scoped>
    
    .vrow {
         justify-content: center;
         margin-right: 50%;
         padding-left: 5%;
         height: 100%;
         width: 100%;
         font-size: 15px;
         font-weight: 600;
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
      border-radius:50px;
      padding-top: 25px;
    }
    .btn{
        background: #EEA47FFF;
    }
    </style>

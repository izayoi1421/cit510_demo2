

<template>
<v-row class="vrow" >
     <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >     
 <v-card
    class="ma-15"
    max-width="600"   
    style="background-color: rgba(19, 62, 124, 0.3)"  
 >

  <v-card-title style="text-align:center;color:white;"> About Me </v-card-title>
     <img class="myimage" src="/Naguit.png" alt="My Picture">
     <v-card style="padding-top:10px; padding-bottom:10px; background-color: rgba(19, 62, 124, 0.6);" >
          <p style="text-align:center;color:white;" >
            "My name is Christian Dave C. Naguit, Currently a 4th year College, taking a course of Information Technology. I am a student of Mr. Chavez from the subject of Integrative Programming Technology 2. Taking IPT2 subject helps me in enhancing my coding skills in programming.
          </p>   
     </v-card>
 </v-card>  
 </v-col>
</v-row>
</template>
<style scoped>

.vrow {
  justify-content: center;
     margin-right: 50%;
     padding-left: 8% ;
     padding-top: 10% ;
     height: 98%;
     width: 101% ;
     font-size: 10px;
  background-image: url("/aboutme.jpg");
  background-size: cover;
}
.ma-15{
     background-color: #D8FFF8;
     border-radius:50px;
     height: 350px;
     width: 600px;
     padding: 25px;
}
.myimage{
     height: 150px;
     width: 150px;
     border-radius:70px;
     margin-bottom: 30px;
     margin-left: 36%;
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




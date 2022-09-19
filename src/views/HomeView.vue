<template>
  <v-row class="vrow">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card
        class="ma-15"
        max-width="279"
        style="background-color: rgba(19, 62, 124, 0.3)"
      >
        <v-card-text>
          <h1>Welcome user!</h1>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<style scoped>
.ma-15 {

  height: 60px;
  width: 250px;
  padding-top: 5px;
  padding-left: 13px;
  border-radius: 50px;
  margin-left: 75%;
  color: #FEFE95;
}
.center {
  width: 50%;
  height: 100%;
  border-radius: 50px;
}
.vrow {
  justify-content: center;
     margin-right: 50%;
     padding-left: 19% ;
     padding-top: 10% ;
     height: 105%;
     width: 101% ;
     font-size: 10px;
  background-image: url("welcome.jpg");
  background-size: cover;
}
</style>
<script setup>
</script>



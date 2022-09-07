

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
          <v-text-field
            v-model.number="fNumber"
            :error-messages="errorMessages"
            label="Enter First Number:"
            placeholder="123456.."
            required
          ></v-text-field>

          <v-text-field
            v-model.number="sNumber"
            label="Enter Second Number:"
            placeholder=" "
            required
          ></v-text-field>
          <p style="text-align:center">Sum: {{sum}}</p>
          <p style="text-align:center">Difference: {{difference}}</p>
          <p style="text-align:center">Product: {{product}}</p>
          <p style="text-align:center">Quotient: {{quotient}}</p>
          <p style="text-align:center">Average: {{average}}</p>
        </v-card-text>

        <v-divider class="mt-12"></v-divider>

        <v-card-actions class="vcardaction">
        <v-btn rounded color="#1520A6" class="btn" @click="doCompute">Result</v-btn>
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
</style>
<script setup>
  import {ref} from 'vue'

  const fNumber=ref(0)
  const sNumber=ref(0)
  const sum=ref(0)
  const difference=ref(0)
  const product=ref(0)
  const quotient=ref(0)
  const average=ref(0)

  function doCompute(){
    sum.value = fNumber.value + sNumber.value
    difference.value = fNumber.value - sNumber.value
    product.value = fNumber.value * sNumber.value
    quotient.value = fNumber.value / sNumber.value
    average.value = sum.value / 2
    return
  }
</script>



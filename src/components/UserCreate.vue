<template>
  <v-row class="vrow" v-if="!isLoggedIn">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="ma-15" ref="form">
        <div class="card card-body mt-4" style="background: aqua">
            <v-card-text>
              <v-card-title class="logintitle"><h1>Enter Name Info</h1></v-card-title>
              <v-text-field
                v-model="name"
                type="text"
                label="Enter Name"
                placeholder="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="email"
                type="text"
                label="Enter Email"
                placeholder="Email"
                required
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="vcardaction">
              <span style="padding-right: 60px; padding-bottom: 15px">
                <button
                  type="submit"
                  class="btn btn-success mt-3"
                  style="background: royalblue"
                  @click="onSubmit"
                >
                  Submit
                </button>
              </span>
            </v-card-actions>
        
        </div>
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
.vcard {
  border-radius: 50px;
}
.vcardaction {
  display: flex;
  justify-content: center;
  align-items: center;
}
.ma-15 {
  justify-content: center;
  width: 400px;
  border-radius: 50px;
  padding-top: 20px;
  background-color: rgba(128, 170, 247, 0.897);
  margin-top: 50%;
}
.btn {
  background: rgba(238, 164, 127, 0.548);
}
</style>
<script>
import { createUser } from "@/fb";
import { reactive } from "vue";

export default {
  setup() {
    const form = reactive({ name: "", email: "" });

    const onSubmit = async () => {
      await createUser({ ...form });
      form.name = "";
      form.email = "";
    };

    return { form, onSubmit };
  },
};
</script>

<template>
  <v-row class="vrow" v-if="!isLoggedIn">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card class="ma-15" ref="form">
        <v-card-text>
          <table boder="1">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="{ id, name, email } in users" :key="id">
                <td>{{ name }}</td>
                <td>{{ email }}</td>
                <td>
                  <v-card-actions class="vcardaction">
                    <span style="padding-left: 60px; padding-bottom: 15px">
                      <router-link :to="`/edit/${id}`">
                        <v-btn type="text" rounded color="#00539CFF" class="btn"
                          >Edit</v-btn
                        >
                      </router-link>
                    </span>
                    <v-spacer></v-spacer>
                    <span style="padding-right: 60px; padding-bottom: 15px">
                      <button
                        class="btn btn-danger btn-sm"
                        @click="deleteUser(id)"
                      >
                        Unpublish
                      </button>
                    </span>
                  </v-card-actions>
                </td>
              </tr>
            </tbody>
          </table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
  import { useLoadUsers, deleteUser } from "@/fb";
  
  export default {
    setup() {
      const users = useLoadUsers();
      return { users, deleteUser };
    },
  };
  </script>
  
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


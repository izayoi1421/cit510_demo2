<template>
  <v-row class="vrow" v-if="!isLoggedIn">
  <v-col cols="12" sm="10" md="8" lg="6">
    <v-card class="ma-15">
      <form @submit.prevent="update">
            <v-card-title class="logintitle"><h1>Edit Name</h1></v-card-title>

		<v-text-field v-model="form.name" class="form-control" required />
      
 
          <v-card-actions class="vcardaction">
            <span
                  style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    padding-left: 0%;
                  "
                >
              <button
                type="submit"
                style="color: royalblue;border-radius: 10px;">
                Submit
              </button>
            </span>
          </v-card-actions>
        </form>
    </v-card>
  </v-col>
</v-row>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUser, updateUser } from '@/fb'

export default {
setup() {
  const router = useRouter()
  const route = useRoute()
  const userId = computed(() => route.params.id)

  const form = reactive({ name: '' })
  onMounted(async () => {
    const user = await getUser(userId.value)
    console.log(user, userId.value)
    form.name = user.name
  })

  const update = async () => {
    await updateUser(userId.value, { ...form })
    router.push('/crud')
    form.name = ''
  }

  return { form, update }
}
}
</script>

<style scoped>

.table,th,td{
  border: 1px solid;
  text-align: center;
  padding: 5px;
}
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
  width: 60%;
  align-items: center;
  justify-content: center;
  width: 100px auto;
  border-radius: 10px;
  padding-top: 10px;
  background-color: rgba(128, 170, 247, 0.897);
  margin-top: 50%;
}
.btn {
  background: rgba(238, 164, 127, 0.548);
}
</style>
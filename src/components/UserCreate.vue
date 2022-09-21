<template>
  <div class="card card-body mt-4" style="background:aqua;">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Book</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <button type="submit" class="btn btn-success mt-3" style="background:royalblue;">
        Publish
      </button>
    </form>
  </div>
</template>

<script>
import { createUser } from '@/fb'
import { reactive } from 'vue'

export default {
  setup() {
    const form = reactive({ name: '', email: '' })

    const onSubmit = async () => {
      await createUser({ ...form })
      form.name = ''
      form.email = ''
    }

    return { form, onSubmit }
  }
}
</script>

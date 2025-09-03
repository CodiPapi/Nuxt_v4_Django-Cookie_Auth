<template>
  <UContainer class="container login-container mt-10">
    <h1 class="title">Login</h1>
    <UForm :schema="schema" :state="formState" class="space-y-4" @submit="login">
      <UFormField label="Email" name="email">
        <UInput v-model="formState.email"/>
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput v-model="formState.password" type="password" />
      </UFormField>

      <UButton type="submit" variant="outline">
        Login
      </UButton>
    </UForm>
  </UContainer>
</template>

<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

const formState = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined
})
const toast = useToast()


import { useAuthStore } from "~/stores/auth"
const authStore = useAuthStore()
const wrong_password = ref(false)

async function login(event: FormSubmitEvent<Schema>) {
  await authStore.login(event.data.email, event.data.password)
  if (authStore.isAuthenticated) {
    wrong_password.value = false
    await navigateTo("/user")
  }
  else {
    console.log("Not authenticated")
    formState.password = ""
    toast.add({
      title: 'Login failed',
      description: 'Invalid password',
      color: 'warning',
      progress: false,
      duration: 2000,
    })
    navigateTo("/login")
  }
}

</script>

<style scoped>
</style>
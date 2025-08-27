<template>
  <div class="p-6 max-w-sm mx-auto">
    <h1 class="text-xl mb-4">Register</h1>
    <form @submit.prevent="register">
      <input
        v-model="username"
        placeholder="Username"
        class="border p-2 mb-2 block w-full"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 mb-2 block w-full"
      />
      <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">
        Register
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const username = ref("")
const password = ref("")

const config = useRuntimeConfig()

const register = async () => {
  try {
    await $fetch(`${config.public.apiBase}/accounts/register/`, {
      method: "POST",
      body: { username: username.value, password: password.value },
      credentials: "include", 
    })
    alert("Registered!")
  } catch (e) {
    alert("Registration failed")
  }
}
</script>

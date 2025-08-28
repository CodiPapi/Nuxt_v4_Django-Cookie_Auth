<template>
  <div class="container">
    <h1 class="title">Login</h1>

    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" class="input" />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="input"
      />
      <button type="submit" class="button">Login</button>
    </form>

    <div v-if="wrong_password" class="error">
      Incorrect username or password. Please try again.
    </div>
  </div>
</template>

<script setup lang="ts">
const username = ref("")
const password = ref("")
const wrong_password = ref(false)

import { useAuthStore } from "~/stores/auth"
const authStore = useAuthStore()

const login = async () => {
  await authStore.login(username.value, password.value)
  if (authStore.isAuthenticated) {
    wrong_password.value = false
    await navigateTo("/user")
  }
  else {
    console.log("Not authenticated")
    password.value = ""
    wrong_password.value = true
    navigateTo("/login")
  }
}

</script>

<style scoped>
.container {
  padding: 1.5rem;
  max-width: 400px;
  margin: 2rem auto;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid #aaa;
  border-radius: 4px;
  box-sizing: border-box;
}

.button {
  width: 100%;
  padding: 0.5rem;
  background-color: #2563eb; /* blue */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #1e40af;
}

.error {
  color: red;
  margin-top: 0.5rem;
}
</style>
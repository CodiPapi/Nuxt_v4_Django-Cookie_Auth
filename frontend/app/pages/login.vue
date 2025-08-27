<template>
  <div class="p-6 max-w-sm mx-auto">
    <h1 class="text-xl mb-4">Login</h1>

    <form @submit.prevent="login">
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
        Login
      </button>
    </form>


  </div>
</template>

<script setup lang="ts">
const username = ref("")
const password = ref("")

const config = useRuntimeConfig()

const login = async () => {
  try {
    const { data, error } = await useFetch(`${config.public.apiBase}/accounts/login/`, {
      method: "POST",
      body: { username: username.value, password: password.value },
      credentials: "include", 
    })
    if (!error.value) {
      navigateTo("/user")
    } else {
      console.log("Login error:", error.value)
      navigateTo("/login")
    }

  } catch (e) {
    await navigateTo("/login")
    console.log("Login failed:",e)
  }
}

</script>

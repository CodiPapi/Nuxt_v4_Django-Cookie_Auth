<template>
  <div class="title container">
    <h1>User Profile</h1>
    <p v-if="userEmail">Your email: {{ userEmail }}</p>
    <p v-else>Loading user data...</p>

    <button
      @click="logout"
      class="button"
    >
      Logout
    </button>  
  </div>
</template>

<script setup lang="ts">

const userEmail = ref<string | null>(null);
const runtimeConfig = useRuntimeConfig();
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.fetchUser();
  userEmail.value = authStore.user?.username ?? null;
});

const logout = async () => {
  authStore.logout();
  await navigateTo("/login");
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

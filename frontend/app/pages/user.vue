<template>
  <div class="container user-container">
    <h1>User Profile</h1>
    <p v-if="userEmail">Your email: {{ userEmail }}</p>
    <p v-else>Loading user data...</p>

      <UButton loading-auto @click="logout">
        Logout
      </UButton>
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

</style>

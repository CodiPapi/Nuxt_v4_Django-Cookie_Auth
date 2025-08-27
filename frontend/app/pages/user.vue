<template>
  <div>
    <h1>User Profile</h1>
    <p v-if="userEmail">Your email: {{ userEmail }}</p>
    <p v-else>Loading user data...</p>
  </div>
    <button
      @click="logout"
      class="mt-4 bg-gray-500 text-white p-2 rounded w-full"
    >
      Logout
    </button>
</template>

<script setup lang="ts">

const userEmail = ref<string | null>(null);
const runtimeConfig = useRuntimeConfig();

onMounted(async () => {
  try {
    const response = await fetch(`${runtimeConfig.public.apiBase}/accounts/user/`,  {credentials: 'include',
     });
    if (response.ok) {
      const data = await response.json();
      userEmail.value = data.username;
    } else {
      console.error('Failed to fetch user data:', response.statusText);
    }
  } catch (e) {
    console.error('Error fetching user data:', e);
  }
});

const logout = async () => {
  try {
    await useFetch(`${runtimeConfig.public.apiBase}/accounts/logout/`, {
      method: "POST",
      credentials: "include",
    })
    navigateTo("/login")
  } catch (e) {
    console.error('Error logging out:', e);
  }
}
</script>

<style scoped>

</style>

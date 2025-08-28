// stores/auth.ts
import { defineStore } from 'pinia'

export interface User {
  username: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const isAuthenticated = computed(() => !!user.value);

  const config = useRuntimeConfig();

  const setAuth = (data: User | null) => {
    user.value = data;
  };

  const login = async (username: string, password: string) => {
    console.log("In Login function")
    const csrfCookie = useCookie("csrftoken").value;
    try {
      const res = await fetch(`${config.public.apiBase}/accounts/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfCookie ?? "",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error(`Login failed: ${res.status}`);
      }

      const data: User = await res.json();
      console.log("LOGIN - Fetch complete");
      console.log("Data:", data);

      setAuth(data);
      return user.value;
    } catch (err) {
      console.error("Login error:", err);
      setAuth(null);
      return null;
    }
  };

const register = async (email: string, password: string) => {
  const csrfCookie = useCookie("csrftoken");

  try {
    const res = await fetch(`${config.public.apiBase}/accounts/register/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfCookie.value ?? "",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error(`Register failed: ${res.status}`);
    }

    const data: User = await res.json();
    setAuth(data);
    return user.value;
  } catch (err) {
    console.error("Register error:", err);
    setAuth(null);
    return null;
  }
};

const logout = async () => {
  const csrfCookie = useCookie("csrftoken");

  try {
    const res = await fetch(`${config.public.apiBase}/accounts/logout/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "X-CSRFToken": csrfCookie.value ?? "",
      },
    });

    if (!res.ok) {
      throw new Error(`Logout failed: ${res.status}`);
    }

    setAuth(null);
  } catch (err) {
    console.error("Logout error:", err);
  }
};

const fetchUser = async () => {
  try {
    const res = await fetch(`${config.public.apiBase}/accounts/user/`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Fetch user failed: ${res.status}`);
    }

    const data: User = await res.json();
    setAuth(data);
    return user.value;
  } catch (err) {
    console.error("Fetch user error:", err);
    setAuth(null);
    return null;
  }
};


  return { user, isAuthenticated, login, register, logout, fetchUser};
})

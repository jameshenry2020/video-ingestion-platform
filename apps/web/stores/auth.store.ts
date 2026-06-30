import { create } from "zustand";
import { api } from "@/lib/api";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,

  login: (token, user) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
    set({ user, isAuthenticated: true, error: null });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      // Also clean up any upload session keys
      const keys = Object.keys(localStorage);
      keys.forEach((key) => {
        if (key.startsWith("upload_session_")) {
          localStorage.removeItem(key);
        }
      });
    }
    set({ user: null, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    if (typeof window === "undefined") {
      set({ loading: false });
      return false;
    }

    const token = localStorage.getItem("access_token");
    if (!token) {
      set({ user: null, isAuthenticated: false, loading: false });
      return false;
    }

    try {
      const res = await api.get("/auth/me");
      set({ user: res.data, isAuthenticated: true, loading: false });
      return true;
    } catch (err) {
      localStorage.removeItem("access_token");
      set({ user: null, isAuthenticated: false, loading: false });
      return false;
    }
  },

  setError: (error) => set({ error }),
}));

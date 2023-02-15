import { defineStore } from 'pinia';
import { Login } from 'src/auth/types/userModel';
import * as storage from 'src/auth/storage';
import { api } from 'boot/axios';

interface UserState {
  user: any;
  authenticated: boolean;
  token: string;
}

export const useUserStore = defineStore('auth', {
  state: (): UserState => ({
    user: {},
    authenticated: false,
    token: '',
  }),
  getters: {
    getUser: (state) => state.user,
    getUserToken: (state) => state.token,
    isAuthenticated: (state) => state.authenticated,
  },
  actions: {
    async Login(login: Login) {
      await api.post('/api/Usuarios/token/', login).then(async (response) => {
        this.setToken(response.data);
        // await this.GET_USER(response.data.access);
      });
    },
    setToken(payload: any) {
      console.log(payload.token);
      storage.setLocalToken(payload);
      storage.setHeaderToken(payload.token);
      this.token = payload;
      this.authenticated = true;
    },

    logout() {
      storage.deleteLocalToken();
      storage.deleteHeaderToken();
      storage.deleteUser();
      this.user = {};
      this.token = '';
      this.authenticated = false;
    },
  },
});

<template>
  <div class="about">
    <v-app-bar app class="grey lighten-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogout" class="white--text">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <h1>Here you can upload files.</h1>
    <div>
      <v-file-input
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Avatar"
      ></v-file-input>
    </div>

    <div align="center">
      <v-btn elevation="2" color="primary" dark>
        <router-link to="/history" style="text-decoration: none; color: white;">View upload history</router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data: () => ({
    rules: [
      value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
    ],
  }),
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      try {
        await this.logout();
        this.$router.push('/login');
      } catch (error) {
        console.error('Error during logout:', error);
      }
    },
  },
};
</script>

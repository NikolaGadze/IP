<template>
  <div class="about">
    <v-app-bar app class="grey lighten-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogout" class="white--text">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <h1>This is an upload history page</h1>

    <div align="center">
      <v-btn elevation="2" color="primary" dark>
        <router-link to="/welcome" style="text-decoration: none; color: white;">Back to home page</router-link>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
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

<template>
  <v-container class="fill-height" align="center">
    <v-row justify="center">
      <v-col cols="12" align="center">
        <v-btn elevation="2" color="primary" dark>
          <router-link to="/login" style="text-decoration: none; color: white;">Log in</router-link>
        </v-btn>
        <v-spacer height="16"></v-spacer>
        <v-btn elevation="2" color="primary" dark style="margin-top: 10px;">
          <router-link to="/register" style="text-decoration: none; color: white;">Register</router-link>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
    
  }
}
</script>

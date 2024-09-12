<template>
  <v-container class="fill-height background-image" align="center" justify="center">
    <v-row align="center" justify="center" class="fill-height">
      <v-col cols="auto" class="text-center">
        <v-btn
          elevation="2"
          color="secondary"
          dark
          class="my-btn"
        >
          <router-link to="/login" style="text-decoration: none; color: white; display: block; width: 100%; height: 100%;">Log in</router-link>
        </v-btn>
        <v-spacer height="16"></v-spacer>
        <v-btn
          elevation="2"
          color="secondary"
          dark
          class="my-btn"
        >
          <router-link to="/register" style="text-decoration: none; color: white; display: block; width: 100%; height: 100%;">Register</router-link>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>.background-image {
  background-image: url('@/assets/background.png');
  display: flex;
  align-items: center; /* Position the image in the bottom-left corner */
  background-repeat: no-repeat;
  background-position: top;
  margin-top: 120px;
  background-size: 30%; /* Adjust the size of the background image (30% of the container size, adjust as needed) */
}

.my-btn {
  width: 200px; /* Adjust the width as needed */
  height: 50px;  /* Adjust the height as needed */
  margin: 10px 0; /* Vertical margin for spacing between buttons */
  
}
.fill-height {
  height: 80vh; /* Ensure the container takes up the full height of the viewport */
  display: flex;
}
</style>

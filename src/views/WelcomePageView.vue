<template>
  <div class="about">
    <v-app-bar app class="grey lighten-2">
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogout" class="white--text">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <h1 align="center">Here you can upload files.</h1>

    <div>
      <v-file-input
        v-model="selectedImage"
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an avatar"
        prepend-icon="mdi-camera"
        label="Upload picture"
      ></v-file-input>
    </div>

    <div align="center">
      <v-btn :loading="loading" elevation="2" color="primary" dark @click="uploadImage">
        Upload and Analyze
      </v-btn>
    </div>

    <div align="center" style="margin-top: 20px;">
      <v-btn elevation="2" color="secondary" dark>
        <router-link to="/history" style="text-decoration: none; color: white;">View Upload History</router-link>
      </v-btn>
    </div>

    <!-- Container for displaying the image with styling -->
    <div id="imageContainer" align="center" style="margin-top: 20px;">
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="uploaded-image"/>
    </div>

    <div v-if="detections.length > 0">
  <h2>Detected:</h2>
  <ul>
    <li v-for="(detection, index) in detections" :key="index">
      {{ detection.name }} - Confidence: {{ detection.confidence.toFixed(2) }} at (x: {{ detection.xmin }}, y: {{ detection.ymin }})
    </li>
  </ul>
</div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedImage: null,
      loading: false,
      detections: [],
      imageUrl: null,
      rules: [
        value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
      ],
    };
  },
  methods: {
    ...mapActions(['logout']),
    async uploadImage() {
      if (!this.selectedImage) {
        alert('Please select an image to upload.');
        return;
      }

      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.selectedImage);

      try {
        const response = await axios.post('http://localhost:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'json', // Expect JSON response
        });

        // Extract detections and image from the response
        this.detections = response.data.detections || [];

        // Decode the Base64 image
        this.imageUrl = `data:image/jpeg;base64,${response.data.image}`;
      } catch (error) {
        console.error('Error during image upload and analysis:', error);
        alert('There was an error uploading your image. Please try again.');
      } finally {
        this.loading = false;
      }
    },

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



<style>
.uploaded-image {
  max-width: 700px;
  border-radius: 15px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}
</style>

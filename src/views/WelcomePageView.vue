<template>
  <div class="about">
    <!-- Modernized App Bar -->
    <v-app-bar app class="grey lighten-4 elevation-2">
      <v-toolbar-title class="primary--text">AutoPlates Insight</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="handleLogout" class="white--text">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Title with car icon -->
    <h1 align="center" class="page-title">
      Upload and analyze your image
      <v-icon class="animated-car" color="primary" size="48">mdi-car</v-icon>
    </h1>

    <!-- Customized File Input -->
    <div class="file-upload-container">
      <v-file-input
        v-model="selectedImage"
        :rules="rules"
        accept="image/png, image/jpeg, image/bmp"
        placeholder="Pick an image"
        prepend-icon="mdi-camera"
        label="Upload picture"
        outlined
        dense
        class="custom-file-input"
      ></v-file-input>
    </div>

    <!-- Upload Button with loading state -->
    <div align="center">
      <v-btn :loading="loading" elevation="2" color="primary" dark class="upload-btn" @click="uploadImage">
        Upload and Analyze
      </v-btn>
    </div>

    <!-- Container for displaying the uploaded image -->
    <div id="imageContainer" align="center" style="margin-top: 20px;">
      <img v-if="imageUrl" :src="imageUrl" alt="Uploaded Image" class="uploaded-image"/>
    </div>

    <!-- Display detected objects -->
    <div v-if="detections.length > 0" class="detections-list">
      <h2>Detected Objects:</h2>
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
        value => !value || value.size < 2000000 || 'Image size should be less than 2 MB!',
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
          responseType: 'json',
        });

        this.detections = response.data.detections || [];
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

/* Styling for the page title */
.page-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 25px;
  color: #424242;
  margin-top: 20px;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

/* Car icon animation */
.animated-car {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

/* Custom styling for file input */
.file-upload-container {
  max-width: 400px;
  margin: 0 auto;
  margin-top: 30px;
}

.custom-file-input .v-input__control {
  border-radius: 15px;
}

/* Upload Button styling */
.upload-btn {
  margin-top: 20px;
}

/* Styling for the uploaded image */
.uploaded-image {
  max-width: 600px;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

/* Detection list styling */
.detections-list {
  text-align: center;
  margin-top: 20px;
}

.detections-list h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  color: #424242;
}

.detections-list ul {
  list-style-type: none;
  padding: 0;
}

.detections-list li {
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: #757575;
  margin-top: 10px;
}
</style>
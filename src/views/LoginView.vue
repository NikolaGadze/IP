<template>
    <fragment> 
      <div class="background"></div>
      <v-main class="d-flex justify-center align-center">
        <v-col cols="10" lg="4" class="mx-auto" style="margin-top: 100px;">
          <v-card class="pa-5">
            <div class="text-center">
              <v-avatar size="100" color="primary lighten-5">
                <v-icon size="40" color="primary">mdi-account</v-icon>
              </v-avatar>
              <h2 class="primary--text">Log In</h2>
            </div>
  
            <v-form @submit.prevent="submitHandler" ref="form">
              <v-card-text>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  type="email"
                  label="Enter your email"
                  placeholder="Email"
                  prepend-inner-icon="mdi-email"
                />
  
                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :type="passwordShow ? 'text' : 'password'"
                  label="Enter your password"
                  placeholder="Lozinka"
                  prepend-inner-icon="mdi-key"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="passwordShow = !passwordShow"
                />
  
                <p style="font-size: medium;">Don't have an account?<a href="/register" style="text-decoration: none;"> Make one here!</a></p>
              </v-card-text>
  
              <v-card-actions class="justify-center">
                <v-btn :loading="loading" type="submit" color="primary">
                  <span class="white--text px-8">Log In</span>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>
      </v-main>

      <div class="text-center ma-2">
      
      <v-snackbar
        v-model="snackbar"
        color="red"
      >
        {{ text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    </fragment>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
  name: 'LoginView',
  data() {
    return {
      loading: false,
      snackbar: false,
      text: "Invalid email or password!",
      passwordShow: false,
      password: '',
      email: '',
      passwordRules: [
        v => !!v || 'Password is required to enter!',
        v => (v && v.length >= 6) || 'Password must have 6 or more letters!',
      ],
      emailRules: [
        v => !!v || 'Email is required to enter!',
        v => /.+@.+\..+/.test(v) || 'Invalid email!',
      ],
    };
  },
  methods: {
    ...mapActions(['login']),
    async submitHandler() {
      this.loading = true;
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push('/welcome');
      } catch (error) {
        console.error("Error logging in:", error.message, error.code);
        this.snackbar = true;
        this.text = 'Invalid email or password!';
      } finally {
        this.loading = false;
      }
    },
    loadToRegister() {
      window.open('/register', '_self');
    },
  },
};
</script>
  

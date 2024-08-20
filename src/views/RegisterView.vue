<template>
    <fragment>
      <div class="background">
        <v-main class="d-flex justify-center align-center">
          <v-col cols="10" lg="4" class="mx-auto" style="margin-top: 50px;">
            <v-card class="pa-4">
              <div class="text-center">
                <v-avatar size="100" color="primary lighten-5">
                  <v-icon size="40" color="primary">mdi-account</v-icon>
                </v-avatar>
                <h2 class="primary--text">Register here</h2>
              </div>
  
              <v-form @submit.prevent="submitHandler" ref="form" enctype="multipart/form-data" method="post">
                <div>
                  <v-card-text>
                    <div>
                      <v-text-field
                        v-model="form.first_name"
                        :rules="firstNameRules"
                        required
                        type="name"
                        label="First name"
                        placeholder="First name"
                        prepend-inner-icon="mdi-account"
                      />
                    </div>
  
                    <div>
                      <v-text-field
                        v-model="form.last_name"
                        :rules="lastNameRules"
                        type="name"
                        label="Last name"
                        placeholder="Last name"
                        prepend-inner-icon="mdi-account"
                      />
                    </div>
  
                    <div>
                      <v-text-field
                        v-model="form.email"
                        :rules="emailRules"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        prepend-inner-icon="mdi-email"
                      />
                    </div>
  
                    <div>
                      <v-text-field
                        v-model="form.password"
                        :rules="passwordRules"
                        :type="passwordShow ? 'text' : 'password'"
                        label="Password"
                        placeholder="Password"
                        prepend-inner-icon="mdi-key"
                        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="passwordShow = !passwordShow"
                      />
                    </div>
  
                    <div>
                      <v-text-field
                        v-model="form.password_confirmation"
                        :rules="passwordConfirmationRules"
                        :type="password_Show ? 'text' : 'password'"
                        label="Password confirmation"
                        placeholder="Password confirmation"
                        prepend-inner-icon="mdi-key"
                        :append-icon="password_Show ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="password_Show = !password_Show"
                      />
                    </div>
  
                    <p style="font-size: medium;">
                      Already have an account?<a href="/login" style="text-decoration: none;"> Log in here!</a>
                    </p>
                  </v-card-text>
                </div>
  
                <v-card-actions class="justify-center">
                  <v-btn :loading="loading" type="submit" color="primary">
                    <span class="white--text px-8">Register</span>
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-col>
        </v-main>
  
        <div>
          <v-alert v-model="errorPasswordAlert" border="top" color="red darken-2" dark dismissible>
            Passwords do not match!
          </v-alert>
        </div>
      </div>
    </fragment>
  </template>
  
  <script>
  import { auth } from "@/firebase";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  
  export default {
    name: 'RegisterView',
    data: () => ({
      form: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        password_confirmation: null,
      },
      passwordShow: false,
      password_Show: false,
      errorPasswordAlert: false,
      loading: false,
      firstNameRules: [
        v => !!v || 'First name is required',
        v => (v && v.length >= 2) || 'First name must have at least 2 letters!',
      ],
      lastNameRules: [
        v => !!v || 'Last name is required',
        v => (v && v.length >= 2) || 'Last name must have at least 2 letters!',
      ],
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Invalid email!',
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 6) || 'Password must have at least 6 letters!',
      ],
      passwordConfirmationRules: [
        v => !!v || 'Password confirmation is required',
      ],
    }),
    methods: {
        async submitHandler() {
            this.checkPassword();
            if (this.errorPasswordAlert) return;

            this.loading = true;
            try {
                await createUserWithEmailAndPassword(auth, this.form.email, this.form.password);
                alert('User registered successfully!');
                this.$router.push('/login');
            } catch (error) {
                console.error("Error registering user:", error);
                alert('Error registering user: ' + error.message);
            } finally {
                this.loading = false;
            }
            },
            checkPassword() {
            if (this.form.password !== this.form.password_confirmation) {
                this.errorPasswordAlert = true;
            } else {
                this.errorPasswordAlert = false;
            }
        },
    },
  };
  </script>
  
  
  
  
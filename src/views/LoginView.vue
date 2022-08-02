<template>
  <v-app>
    <v-container class="fill-height" fluid="true">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-window-item :value="1">
                <v-row>
                  <v-col cols="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 text-teal text-teal-accent-3"
                      >
                        Sign in to Vue Books
                      </h1>

                      <h4 class="text-center mt-4">
                        Ensure your email for registration
                      </h4>
                      <v-form @submit.prevent="submitHandler" ref="form">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="Email"
                          name="Email"
                          type="text"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-envelope"
                        />
                        <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          label="Password"
                          name="Password"
                          :type="passwordShow ? 'text' : 'password'"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-lock"
                          :append-icon="
                            passwordShow ? 'fa fa-eye' : 'fa fa-eye-slash'
                          "
                          @click:append="passwordShow = !passwordShow"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3 mb-3">
                      <v-btn
                        :loading="loading"
                        color="secondary"
                        size="large"
                        @click="submitHandler"
                        rounded="pill"
                      >
                        <span class="text-white">SIGN IN</span>
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="12" md="4" class="bg-secondary">
                    <v-card-text class="text-white mt-12">
                      <h1 class="text-center display-1">Hello friends !</h1>
                      <h5 class="text-center mt-4">
                        Enter your personnel details and start journay with us
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        rounded="pill"
                        variant="outlined"
                        color="white"
                        @click="step++"
                        >SING UP</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
              <v-window-item :value="2">
                <v-row class="fill-height">
                  <v-col cols="12" md="4" class="bg-secondary">
                    <v-card-text class="text-white mt-12">
                      <h1 class="text-center display-1">Welcome Back !</h1>
                      <h5 class="text-center mt-4">
                        To keep connected with us, please login with your
                        personal info
                      </h5>
                    </v-card-text>
                    <div class="text-center">
                      <v-btn
                        rounded="pill"
                        variant="outlined"
                        color="white"
                        @click="step--"
                        >SING IN</v-btn
                      >
                    </div>
                  </v-col>
                  <v-col col="12" md="8">
                    <v-card-text class="mt-12">
                      <h1
                        class="text-center display-2 text-teal text-teal-accent-3"
                      >
                        Create account
                      </h1>

                      <h4 class="text-center mt-4">
                        Ensure your email for registration
                      </h4>
                      <v-form @submit.prevent="submitHandler" ref="form2">
                        <v-text-field
                          v-model="name"
                          :rules="nameRules"
                          label="Name"
                          name="Name"
                          type="text"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-user"
                        />
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          label="Email"
                          name="Email"
                          type="text"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-envelope"
                        />
                        <v-text-field
                          v-model="password"
                          :rules="passwordRules"
                          label="Password"
                          name="Password"
                          :type="passwordShow ? 'text' : 'password'"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-lock"
                          :append-icon="
                            passwordShow ? 'fa fa-eye' : 'fa fa-eye-slash'
                          "
                          @click:append="passwordShow = !passwordShow"
                        />
                        <v-text-field
                          v-model="confirmPassword"
                          :rules="[passwordConfirmationRule]"
                          label="Confirm Password"
                          name="confirmPassword"
                          :type="passwordShow ? 'text' : 'password'"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-lock"
                          :append-icon="
                            passwordShow ? 'fa fa-eye' : 'fa fa-eye-slash'
                          "
                          @click:append="passwordShow = !passwordShow"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3 mb-3">
                      <v-btn
                        :loading="loading"
                        color="secondary"
                        size="large"
                        @click="registerHandler"
                        rounded="pill"
                      >
                        <span class="text-white">SIGN UP</span>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-window-item>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      :color="snackColor ? 'green' : 'red'"
      outlined
      v-model="snackBar"
    >
      <div class="d-flex justify-space-between align-center">
        {{ message }}
        <v-btn
          icon
          color="secondary"
          size="small"
          class="ml-auto"
          @click="snackBar = false"
        >
          <v-icon>fa fa-times</v-icon>
        </v-btn>
      </div>
    </v-snackbar>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    snackColor: true,
    loading: false,
    snackBar: false,
    message: "",
    step: 1,
    passwordShow: false,
    name: "",
    nameRules: [(v) => !!v || "Name is required"],
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password ust be 8 characters or more !",
    ],
    confirmPassword: "",
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
  }),
  props: {
    source: String,
  },
  methods: {
    submitHandler() {
      this.$refs.form.validate().then(async (response) => {
        console.log(response.valid);
        if (response.valid) {
          this.loading = true;
          await axios({
            method: "post",
            url: "http://localhost:3000/auth/login",
            data: {
              email: this.email,
              password: this.password,
            },
          }).then((res) => {
            if (res.status != 200) {
              alert(res.data.message);
              this.message = res.data.message;
              this.snackColor = false;
              this.snackBar = true;
              this.loading = false;
            } else {
              this.message = "Login success";
              this.snackBar = true;
              this.loading = false;
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userId", res.data.user._id);
              localStorage.setItem("userName", res.data.user.name);
              this.goToHome();
            }
          });
        } else {
          this.message = "Please verify the fields";
          this.snackColor = false;
          this.snackBar = true;
          this.loading = false;
        }
      });
    },
    registerHandler() {
      this.$refs.form2.validate().then(async (response) => {
        if (response.valid) {
          this.loading = true;
          await axios({
            method: "post",
            url: "http://localhost:3000/auth/register",
            data: {
              name: this.name,
              email: this.email,
              password: this.password,
            },
          }).then((res) => {
            if (res.status != 201) {
              alert(res.data.message);
              this.message = res.data.message;
              this.snackColor = false;
              this.snackBar = true;
              this.loading = false;
            } else {
              this.message = "Register success";
              this.snackBar = true;
              this.step--;
              this.loading = false;
            }
          });
        } else {
          this.message = "Please verify the fields";
          this.snackColor = false;
          this.snackBar = true;
          this.loading = false;
        }
      });
    },
    goToHome() {
      this.$router.push({
        name: "home",
        params: { name: localStorage.getItem("userName") },
      });
    },
  },
  computed: {
    passwordConfirmationRule() {
      return this.password === this.confirmPassword || "Password must match";
    },
  },
};
</script>

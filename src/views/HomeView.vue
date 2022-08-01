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
                          id="password"
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
                      <v-form>
                        <v-text-field
                          label="Name"
                          name="Name"
                          type="text"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-user"
                        />
                        <v-text-field
                          label="Email"
                          name="Email"
                          type="text"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-envelope"
                        />
                        <v-text-field
                          id="password"
                          label="Password"
                          name="Password"
                          type="password"
                          color="teal accent-3"
                          variant="underlined"
                          prepend-icon="fa fa-lock"
                        />
                      </v-form>
                    </v-card-text>
                    <div class="text-center mt-3 mb-3">
                      <v-btn color="secondary" rounded="pill">
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
    <v-snackbar color="success" outlined v-model="snackBar">
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
export default {
  data: () => ({
    loading: false,
    snackBar: false,
    message: "",
    step: 1,
    passwordShow: false,
    password: "",
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 8) || "Password ust be 8 characters or more !",
    ],
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
      this.message = "Login success";
      if (this.$refs.form.validate()) {
        this.snackBar = true;
        console.log(this.email);
      }
    },
  },
};
</script>

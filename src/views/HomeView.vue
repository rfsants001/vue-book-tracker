<template>
  <v-app>
    <template v-if="notBooks">
      <div class="home">
        <h1 class="text-center">Welcome to Vue Tracker Book</h1>
      </div>

      <b-table striped hover :items="itemsBook"></b-table>
    </template>

    <template v-else>
      <h1 class="text-center">Welcome to Vue Tracker Book</h1>

      <p class="text-center mt-5">Not books found</p>

      <v-container class="fill-height" fluid="true">
        <v-row align="center" justify="center">
          <v-card class="elevation-12" width="500">
            <v-col>
              <v-card-text class="mt-12">
                <h3 class="text-center display-2 text-teal text-teal-accent-3">
                  Register you book here
                </h3>
                <v-form @submit.prevent="submitHandler" ref="form">
                  <v-col>
                    <v-row>
                      <v-text-field
                        v-model="title"
                        label="Title"
                        name="Title"
                        type="text"
                        color="teal accent-3"
                        variant="underlined"
                        class="mr-5"
                      />
                      <v-text-field
                        v-model="author"
                        label="Author"
                        name="Author"
                        type="text"
                        color="teal accent-3"
                        variant="underlined"
                      />
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="dateDue"
                        label="Date Due"
                        name="Date Due"
                        type="date"
                        color="teal accent-3"
                        variant="underlined"
                      />
                    </v-row>
                    <v-row>
                      <v-select
                        v-model="status"
                        variant="underlined"
                        :items="items"
                        label="Status"
                        @change="statusCheck"
                      ></v-select>
                      <!-- <v-rating
                        background-color="grey"
                        color="warning"
                        hover
                        length="5"
                        disable
                        v-model="rating"
                      ></v-rating> -->
                    </v-row>
                  </v-col>
                </v-form>
              </v-card-text>
              <div class="text-center mt-3 mb-3">
                <v-btn
                  :loading="loading"
                  color="secondary"
                  size="large"
                  @click="registerBook"
                  rounded="pill"
                >
                  <span class="text-white">REGISTER</span>
                </v-btn>
              </div>
            </v-col>
          </v-card>
        </v-row>
      </v-container>
    </template>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      itemsBook: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
      books: [],
      notBooks: false,
      statusChecked: false,
      items: ["Want to read", "Reading", "Read"],
      status: "",
      title: "",
      author: "",
      dateAdded: new Date(),
      dateDue: new Date(),
    };
  },
  async mounted() {
    await axios({
      method: "get",
      url: `http://localhost:3000/user/books/${localStorage.getItem("userId")}`,
      headers: {
        Authorization: `token ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status != 200) {
        alert(res.data.message);
      } else {
        if (res.data.length == 0) {
          this.notBooks = false;
        }
        this.notBooks = true;
        this.books = res.data[0];
        console.log(this.books);
      }
    });
  },
  methods: {
    async registerBook() {
      console.log(
        this.title,
        this.author,
        this.dateAdded,
        this.dateDue,
        this.status
      );
      let dateAddFormat =
        this.dateAdded.getFullYear() +
        "-" +
        +this.addZero(this.dateAdded.getMonth() + 1).toString() +
        "-" +
        +this.addZero(this.dateAdded.getDate().toString());
      await axios({
        method: "post",
        url: `http://localhost:3000/user/book/${localStorage.getItem(
          "userId"
        )}`,
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: {
          title: this.title,
          author: this.author,
          dateAdded: dateAddFormat,
          dateDue: this.dateDue,
          rate: null,
          status: this.status,
        },
      }).then((res) => {
        if (res.status != 201) {
          alert(res.data.message);
        } else {
          if (res.data.length == 0) {
            this.notBooks = false;
          }
          alert(res.data.message);
          this.$forceUpdate();
        }
      });
    },
    addZero(num) {
      if (num <= 9) return "0" + num;
      else return num;
    },
  },
};
</script>

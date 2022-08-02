<template>
  <v-app>
    <template v-if="notBooks">
      <div class="home">
        <h1 class="text-center">Welcome to Vue Tracker Book</h1>
      </div>

      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex
            v-for="book in books"
            :key="book._id"
            class="mb-5"
            xs12
            md6
            lg3
          >
            <v-card
              class="mx-3 mt-5 elevation-12"
              width="344"
              height="400"
              outlined
            >
              <v-list-item three-line>
                <v-list-item-content>
                  <div class="text-overline mb-4">
                    <p
                      class="headline mb-0"
                      v-text="getStatus(book.status)"
                    ></p>
                  </div>
                  <v-list-item-title v-text="book.title" class="text-h5 mb-1">
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Author: {{ book.author }}
                  </v-list-item-subtitle>
                  <div class="mt-5">
                    <h5>
                      Date Added:
                      {{ formatDate(book.dateAdded) }}
                    </h5>
                    <h5 class="mt-3">
                      Date Due:
                      {{ formatDate(book.dateDue) }}
                    </h5>
                  </div>
                </v-list-item-content>

                <v-list-item-subtitle class="mt-5">
                  Status: {{ getStatus(book.status) }}
                  <v-rating
                    v-if="showRating"
                    background-color="grey"
                    color="warning"
                    length="5"
                    readonly
                    v-model="book.rate"
                  ></v-rating>
                </v-list-item-subtitle>

                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                ></v-list-item-avatar>
              </v-list-item>

              <v-card-actions>
                <v-dialog v-model="dialog" width="800">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="red lighten-2"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      @click="dialog = true"
                    >
                      Edit
                    </v-btn>
                  </template>

                  <v-card width="800">
                    <v-card-title class="text-h5 grey lighten-2">
                      Edit book: {{ book.title }}
                    </v-card-title>

                    <v-form
                      class="ma-5"
                      @submit.prevent="submitHandler"
                      ref="form"
                    >
                      <v-col>
                        <v-row>
                          <v-text-field
                            v-model="title"
                            :label="book.title"
                            name="Title"
                            type="text"
                            color="teal accent-3"
                            variant="underlined"
                            class="mr-5"
                          />
                          <v-text-field
                            v-model="author"
                            :label="book.author"
                            name="Author"
                            type="text"
                            color="teal accent-3"
                            variant="underlined"
                          />
                        </v-row>
                        <v-row>
                          <v-text-field
                            v-model="dateDueEdit"
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
                            @change="statusChecked"
                          ></v-select>
                          <v-rating
                            background-color="grey"
                            color="warning"
                            hover
                            length="5"
                            disable
                            v-model="rating"
                          ></v-rating>
                        </v-row>
                      </v-col>
                    </v-form>

                    <v-divider></v-divider>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="editBook(book)">
                        Edit
                      </v-btn>
                      <v-btn color="primary" text @click="dialog = false">
                        Cancel
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-btn
                  outlined
                  rounded
                  text
                  color="red"
                  @click="deleteBook(book)"
                >
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
                      <v-rating
                        background-color="grey"
                        color="warning"
                        hover
                        length="5"
                        disable
                        v-model="rating"
                      ></v-rating>
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
    <div class="d-flex flex-row-reverse">
      <v-btn
        v-if="notBooks"
        outlined
        rounded
        text
        color="green"
        class="mt-5"
        @click="notBooks = false"
      >
        Add book
      </v-btn>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      notBooks: false,
      statusChecked: false,
      items: ["Want to read", "Reading", "Read"],
      status: "",
      title: "",
      author: "",
      dateAdded: new Date(),
      dateDue: new Date(),
      dateDueEdit: "",
      statusNumber: 0,
      rating: 0,
      dialog: false,
      showRating: false,
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
          return;
        }
        console.log(res.data.length == 0);
        this.notBooks = true;
        this.books = JSON.parse(JSON.stringify(res.data));
      }
    });
  },
  methods: {
    async registerBook() {
      this.rating = null;
      console.log(
        this.title,
        this.author,
        this.dateAdded,
        this.dateDue,
        this.status
      );
      if (this.status == "Want to read") {
        this.statusNumber = 0;
      }
      if (this.status == "Reading") {
        this.statusNumber = 1;
      }
      if (this.status == "Read") {
        this.statusNumber = 2;
      }

      if (this.statusNumber != 2 && this.rating != null) {
        this.rating = null;
        return alert("Only book read can rating");
      }

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
          rate: this.rating,
          status: this.statusNumber,
        },
      }).then((res) => {
        if (res.status != 201) {
          alert(res.data.message);
        } else {
          if (res.data.length == 0) {
            this.notBooks = false;
          }
          this.$forceUpdate();
          alert(res.data.message);
        }
      });
    },
    addZero(num) {
      if (num <= 9) return "0" + num;
      else return num;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    getStatus(status) {
      if (status == 0) {
        this.showRating = false;
        return "Want to read";
      }
      if (status == 1) {
        this.showRating = false;
        return "Reading";
      }
      if (status == 2) {
        this.showRating = true;
        return "Read";
      }
    },
    async editBook(book) {
      if (this.status == "Want to read") {
        this.statusNumber = 0;
      }
      if (this.status == "Reading") {
        this.statusNumber = 1;
      }
      if (this.status == "Read") {
        this.statusNumber = 2;
      }

      if (this.title.length == 0) {
        this.title = book.title;
      }

      if (this.author == 0) {
        this.author = book.author;
      }

      if (this.dateDueEdit.length == 0) {
        this.dateDueEdit = book.dateDue;
      }

      if (this.statusNumber != 2) {
        this.rating = null;
        return alert("Only book read can rating");
      }

      await axios({
        method: "put",
        url: `http://localhost:3000/user/book/${localStorage.getItem(
          "userId"
        )}`,
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: {
          idBook: book._id,
          title: this.title,
          author: this.author,
          dateAdded: book.dateAdded,
          dateDue: this.dateDueEdit,
          rate: this.rating,
          status: this.statusNumber,
        },
      }).then((res) => {
        if (res.status != 200) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
          this.dialog = false;
          this.$forceUpdate();
        }
      });
    },
    async deleteBook(book) {
      await axios({
        method: "delete",
        url: `http://localhost:3000/user/book/${localStorage.getItem(
          "userId"
        )}`,
        headers: {
          Authorization: `token ${localStorage.getItem("token")}`,
        },
        data: {
          idBook: book._id,
        },
      }).then((res) => {
        if (res.status != 200) {
          alert(res.data.message);
        } else {
          alert(res.data.message);
          this.$forceUpdate();
          this.mounted();
        }
      });
    },
  },
};
</script>

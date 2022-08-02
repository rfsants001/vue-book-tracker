// Styles
import "vuetify/styles";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@mdi/font/css/materialdesignicons.css";
// Vuetify
import { createVuetify } from "vuetify";

export default new createVuetify({
  icons: {
    iconfont: "md" || "fa" || "mdi",
  },
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";

loadFonts();

const app = createApp(App).use(store);

app.use(router).use(vuetify).mount("#app");
app.config.unwrapInjectedRef = true;

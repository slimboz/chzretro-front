import { createApp } from "vue";
import App from "./App.vue";
import "./assets/scss/fonts.css";
import "./assets/scss/main.scss";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import store from "./store/index.js";
import mitt from 'mitt';
import i18n from "./i18n";

const eventBus = mitt()
const app = createApp(App)
  .use(i18n)
  .use(router)
  .use(VueAxios, axios)
  .use(store)

app.config.globalProperties.eventBus = eventBus

app.mount("#app");

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (typeof to.matched[0]?.components.default === "function") {
    eventBus.emit("asyncComponentLoading", to); // Start progress bar
  }
  next();
});

router.beforeResolve((to, from, next) => {
  eventBus.emit("asyncComponentLoaded"); // Stop progress bar
  next();
});

export default app;

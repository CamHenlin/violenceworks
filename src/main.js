import { createApp } from "vue";
import App from "./app.vue";
import router from "./router";
import { createMetaManager } from "vue-meta"; // Import createMetaManager

const app = createApp(App);

// Create and use a meta manager
const metaManager = createMetaManager({
  // Optional configuration
  refreshOnceOnNavigation: true,
    debounceWait: 100
});


app.use(router);
app.use(metaManager);
app.mount("#app");
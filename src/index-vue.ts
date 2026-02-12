import { createApp } from "vue";
import App from "./main.vue";
import "./app.css";
import "./index.scss";
import { initUXP } from "./api/uxp";

console.clear(); // Clear logs on each reload

createApp(App).mount("#app");
initUXP();

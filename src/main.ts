// import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import "./assets/css/index.css"
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router).use(store).mount('#app');
document.title = import.meta.env.VITE_BASE_TITLE;
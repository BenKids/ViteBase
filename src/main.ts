// import 'element-plus/dist/index.css'
import "./assets/css/theme.css"
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(router).use(store).mount('#app');
document.title = import.meta.env.VITE_BASE_TITLE;
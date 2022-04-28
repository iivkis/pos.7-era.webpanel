import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(store).use(router).mount('#app')

window.remode = function () {
    if (localStorage.getItem("dev"))
        localStorage.removeItem("dev")
    else
        localStorage.setItem("dev", true);
    window.location.reload();
}

if (localStorage.getItem("dev"))
    console.log("used dev mode");

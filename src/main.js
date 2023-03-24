// import { createApp } from 'vue'
// import { createPinia } from 'pinia'

// import App from './App.vue'
// import router from './router'

// // import './assets/main.css'
// import './input.css'
// // import './@fortawesome/fortawesome-free'

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'
import './input.css'
window.toastr = toastr;
const app = createApp(App)
const pinia = createPinia()
window.axios = axios;
axios.defaults.baseURL = "http://localhost:3000"
app.use(pinia)
app.use(router)
pinia.use(context => {
    const storeId = context.store.$id
    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }
    const data = serializer.deserialize(window.localStorage.getItem(storeId))
    if (data) {
        context.store.$patch(data)
    }
    context.store.$subscribe((m, s) => {
        window.localStorage.setItem(storeId, serializer.serialize(s))
    })
})
app.mount('#app')


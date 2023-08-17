import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {plugin, defaultConfig} from '@formkit/vue'
import { useToast } from 'vue-toast-notification'
import config from '../formkit.config'

import App from './App.vue'
import router from './router'

import 'vue-toast-notification/dist/theme-sugar.css'

const $toast = useToast({
    duration: 5000,
    position:'top-right'
})

// toast.open({
//     message: 'Probando toast',
//     type: 'success'
// })

const app = createApp(App)

// provider de lo que sea puedo despuesde la coma poner objetos array lo que sea
// siempre estara en el nivel mas alto en el elemtno padre
// y se accede a traves de inject importado de vue en los comppnentes
app.provide('toast', $toast)
app.use(createPinia())
app.use(plugin, defaultConfig(config))
app.use(router)

app.mount('#app')

import './assets/main.css'
import "primevue/resources/themes/lara-light-blue/theme.css"
import "primeicons/primeicons.css"

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

createApp(App).mount('#app')
app.use(PrimeVue);

import { createApp } from 'vue';
import App from './App.vue';
import Toast, { POSITION } from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

const options = {
  // You can set your default options here
};

// Import Vuetify
import 'vuetify/styles'; // Global Vuetify styles
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
});
const app = createApp(App);
app.use(vuetify).mount('#app');
app.use(Toast);

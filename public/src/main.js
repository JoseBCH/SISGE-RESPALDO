import 'core-js/stable';

import 'admin-lte/dist/css/adminlte.css';
import 'admin-lte/plugins/fontawesome-free/css/all.min.css';
import 'admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css';
import 'admin-lte/dist/js/adminlte.js';

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vSelect from "vue-select";
import "@/assets/css/vue-select.css";
import '@/assets/css/base.css';

import '@/assets/js/vendor-all.min.js';
import '@/assets/js/plugins/bootstrap.min.js';

import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import axios from 'axios';

import VeeValidate from 'vee-validate';

import { showLoadingAlert, closeLoadingAlert, warnignAlert, successAlert, warningAlertWithCancel, errorAlert } from './utils/loader';
import { handleApiError, waitForDataTableDraw } from './utils/utils';
import { getData, postData, putData, deleteData } from './utils/fetchData';
import { validarCampo } from './utils/validaciones';

import './utils/formatDate.js';
import '@/utils';

Vue.config.productionTip = false
Vue.prototype.$log = console.log.bind(console)
Vue.component("v-select", vSelect);

Vue.prototype.$axios = axios;
Vue.prototype.$showLoadingAlert = showLoadingAlert;
Vue.prototype.$closeLoadingAlert = closeLoadingAlert;
Vue.prototype.$warnignAlert = warnignAlert;
Vue.prototype.$successAlert = successAlert;
Vue.prototype.$warningAlertWithCancel = warningAlertWithCancel;
Vue.prototype.$errorAlert = errorAlert;
Vue.prototype.$handleApiError = handleApiError;
Vue.prototype.$waitForDataTableDraw = waitForDataTableDraw;
Vue.prototype.$getData = getData;
Vue.prototype.$postData = postData;
Vue.prototype.$putData = putData;
Vue.prototype.$deleteData = deleteData;
Vue.prototype.$validarCampo = validarCampo;

Vue.use(VeeValidate);

export const bus = new Vue();
router.beforeEach((to, from, next) => {
  localStorage.setItem('currentRoute', to.path);
  next();
});
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: {
    App
  }
})

import $ from 'jquery';
window.$ = $;
window.jQuery = $;

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios"

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

const NavbarStore = {
  showNavbar: false
};

const settings = {
  apiKey: '59a55828-0cd7-468b-a92c-c702d2937654',
  lang: 'ru_RU',
  coordorder: 'latlong',
  version: '2.1'
}

import YmapPlugin from 'vue-yandex-maps'

Vue.use(YmapPlugin, settings)

Vue.prototype.$http = Axios



Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

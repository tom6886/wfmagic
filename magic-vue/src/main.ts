/*
 * @Author: 汤波
 * @Date: 2021-05-07 11:13:12
 * @Description:
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2021-12-02 20:16:24
 * @FilePath: /xfwl-screen/src/main.ts
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { post, get, upload } from "@/utils/api";
import "./assets/fonts/digiface-regular/stylesheet.css";
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/lines";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/map";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/effectScatter";
import "echarts/lib/component/visualMap";
import "echarts/lib/component/geo";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";

import * as dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // import locale
dayjs.locale("zh-cn"); // use locale
import * as echarts from "echarts";

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

Vue.component("v-chart", ECharts);
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$upload = upload;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");

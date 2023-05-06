<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cookies from "js-cookie";

@Component
export default class App extends Vue {
  /** 组件已创建 */
  private created() {
    const regExp = new RegExp("(^|&)xzqhDm=([^&]*)(&|$)");
    const code = window.location.search.substr(1).match(regExp);

    if (code) {
      Cookies.set("xzqhDm", code[2]);
    }
  }
}
</script>

<style lang="scss">
html {
  font-size: 10px;
}

body {
  margin: 0;
  height: 100%;
}
</style>

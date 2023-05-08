<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  /** 组件已创建 */
  private created() {}
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

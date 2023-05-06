/*
 * @Author: Zhang Qiaodi
 * @Date: 2021-11-30 18:16:42
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2021-12-02 10:26:39
 * @FilePath: /xfwl-screen/src/shims-tsx.d.ts
 * @Description: 描述
 */
import Vue, { VNode } from "vue";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
declare module "vue/types/vue" {
  interface Vue {
    $echarts: any;
  }
}

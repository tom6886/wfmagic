<template>
  <!--
    created by niujinxi at 20220317
    In your page,you set a container,give an id and set height when you use this component.
    And if you want to change scrollbar's style,just change .scrollContainer's style in your page.That's all..
-->
  <div class="scrollContainer" :id="id">
    <!-- @mouseenter="monseenter"
    @mouseleave="mouseleave" -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ScrollList",
  props: {
    id: String,
  },
  data() {
    return {
      timer: null,
    };
  },
  methods: {
    init() {
      this.setTimer();
      // this.$once代表只执行一次。如果组件是在keep-alive中包裹，则需要更换函数
      // 被keep-alive包裹住的组件有两个生命周期函数：activated和deactivated
      this.$once("hook:beforeDestroy", () => {
        this.removeTimer();
      });
    },
    removeTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    setTimer() {
      this.removeTimer();
      this.timer = setInterval(() => {
        // pixel height：include el and padding    read only
        const scrollHeight = document.getElementById(this.id).scrollHeight;
        // visible area height：include el and padding  read only
        const clientHeight = document.getElementById(this.id).clientHeight;

        const heightDifference = scrollHeight - clientHeight;
        // scroll height：readable and writable
        document.getElementById(this.id).scrollTop += 1.5;

        // when el scroll to top
        if (
          document.getElementById(this.id).scrollTop >=
          heightDifference - 1
        ) {
          this.removeTimer();
          // make it go back to original location after one second
          setTimeout(() => {
            document.getElementById(this.id).scrollTop = 0;
            this.setTimer();
          }, 1000);
        }
      }, 44);
    },
    monseenter() {
      this.removeTimer();
    },
    mouseleave() {
      this.setTimer();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss" scoped>
.scrollContainer::-webkit-scrollbar {
  width: 4px;
  background: aliceblue;
}
.scrollContainer::-webkit-scrollbar-thumb {
  background: palevioletred;
  border-radius: 5px;
}
.scrollContainer {
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
}
// 兼容IE
.scrollContainer {
  /*三角箭头的颜色*/
  scrollbar-arrow-color: #fff;
  /*滚动条滑块按钮的颜色*/
  scrollbar-face-color: #0099dd;
  /*滚动条整体颜色*/
  scrollbar-highlight-color: #0099dd;
  /*滚动条阴影*/
  scrollbar-shadow-color: #0099dd;
  /*滚动条轨道颜色*/
  scrollbar-track-color: #0066ff;
  /*滚动条3d亮色阴影边框的外观颜色——左边和上边的阴影色*/
  scrollbar-3dlight-color: #0099dd;
  /*滚动条3d暗色阴影边框的外观颜色——右边和下边的阴影色*/
  scrollbar-darkshadow-color: #0099dd;
  /*滚动条基准颜色*/
  scrollbar-base-color: #0099dd;
}
</style>

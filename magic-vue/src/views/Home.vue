<template>
  <div class="home-view">
    <div class="content" v-html="content"></div>
    <div class="info">
      <div class="info-list">
        <div class="info-list-box" id="infomationTitleBox">
          <div class="info-index">
            <span style="color: yellow">{{ this.nowIndex + 1 }}</span
            >/{{ this.titleList.length }}
          </div>
          <ul class="info-list-ul" id="infomationTitleUl">
            <li
              :class="
                item.isHighlight ? 'info-list-li highlight' : 'info-list-li'
              "
              v-for="(item, index) in titleList"
              :key="index"
              :id="'infomation' + index"
              @click="clickTitle(item, index)"
            >
              <div class="item-div">
                <div v-show="item.isHighlight" class="item-title">
                  {{ item.title }}
                </div>
                <img
                  :src="preUrl + item.cover"
                  :class="item.isHighlight ? 'item-img-highlight' : 'item-img'"
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Home extends Vue {
  preUrl = "http://139.224.165.146:7080/jeecg-boot/sys/common/static/";
  private titleList = [];

  private content: string = "";

  private nowIndex = 0;

  get width() {
    let domWidth =
      document.getElementById("infomationTitleBox")!.offsetWidth / 2;
    return domWidth;
  }

  clickTitle(item: any, index: any) {
    // console.log(item)
    this.titleList.forEach((i: any) => {
      i.isHighlight = false;
    });
    this.nowIndex = index;
    item.isHighlight = true;
    let domId = "infomation" + index;
    let domLeft = document.getElementById(domId)!.offsetLeft;
    let ulDom = document.getElementById("infomationTitleUl");
    // console.log(ulDom)
    ulDom!.style.left = this.width - domLeft - 100 + "px";
    let boxDom = document.getElementById("infomationTitleBox");
    boxDom!.style.background = `url(${this.preUrl + item.cover} )  no-repeat `;
    boxDom!.style.backgroundSize = `cover`;
    boxDom!.style.backgroundPosition = `center`;
    this.content = item.content;
  }

  /** 组件已挂载 */
  private async mounted() {
    let _this = this;
    _this.getData();
  }

  /** 获取数据 */
  private getData() {
    this.$get(
      `/wfmagic/content/sysContent/list?column=createTime&order=desc&pageNo=1&pageSize=10`
    ).then((res: any) => {
      if (res.code == 200) {
        if (res.result.records.length > 0) {
          res.result.records.map((i: any) => {
            i.isHighlight = false;
          });
          this.titleList = res.result.records;
          setTimeout(() => this.clickTitle(res.result.records[0], 0), 100);
        }
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.home-view {
  width: 1080px;
  height: 1920px;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
}
.info {
  position: absolute;
  bottom: 0px;
  width: 100%;
  .info-list {
    width: 100%;
    .info-list-box {
      width: 100%;
      position: relative;
      overflow: hidden;
      height: 442px;
      .info-list-ul {
        display: flex;
        position: absolute;

        bottom: 20px;
        height: 380px;
        transition: all 0.3s;
        .info-list-li {
          padding: 4px 12px;
          white-space: nowrap;
          cursor: pointer;
        }
        .info-list-li:hover {
          color: #409eff;
        }
        .highlight {
          position: relative;
          // background-color: #409eff;
          color: #fff;
        }
        .highlight:hover {
          color: #fff;
        }
        .highlight::after {
          content: "";
          position: absolute;
          bottom: -5px;
          left: 50%;
          top: 25%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 20px solid #fff;
        }
      }
    }
  }
}
.item-div {
  text-align: center;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
}
.item-title {
  text-align: center;
  font-size: 55px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 90px;
  font-family: "楷体", "楷体_GB2312";
}
.item-img {
  width: 153px;
  height: 153px;
  border-radius: 50%;
  border: 8px solid white;
  // bottom: 20px;
}
.item-img-highlight {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 8px solid white;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
ul {
  list-style-type: none;
}
.info-index {
  color: white;
  font-size: 30px;
  position: absolute;
  top: 20px;
  right: 20px;
}
.content {
  height: 1450px;
}
</style>

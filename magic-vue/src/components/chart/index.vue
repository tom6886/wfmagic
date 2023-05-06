<!--
 * @Author: Zhang Qiaodi
 * @Date: 2021-11-30 18:16:35
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2022-01-06 09:51:14
 * @FilePath: /xfwl-screen/src/components/sunshine-info/index.vue
 * @Description: 描述
-->
<template>
  <div ref="myChart" :style="{ width: '150px', height: '160px' }"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component({
  components: {},
})
export default class Chart extends Vue {
  /** 数据源 */
  @Prop({
    type: Object,
    required: true,
  })
  private readonly data!: any;

  private get color() {
    if (this.data.deviceStatus == "3") {
      return "red";
    }
    return this.rate < 25
      ? "#F41FAC"
      : this.rate < 50
      ? "#FCD20C"
      : this.rate < 75
      ? "#04E00E"
      : "#0264B1";
  }

  private rate = 0;

  private get option() {
    let that = this;
    return {
      angleAxis: {
        show: false,
        max: (100 * 360) / 180, //-45度到225度，二者偏移值是270度除360度
        type: "value",
        startAngle: 180, //极坐标初始角度
        splitLine: {
          show: false,
        },
      },
      barMaxWidth: 10, //圆环宽度
      radiusAxis: {
        show: false,
        type: "category",
      },
      //圆环位置和大小
      polar: {
        center: ["50%", "65%"],
        radius: "180%",
      },
      series: [
        {
          type: "gauge",
          radius: "95%",
          center: ["50%", "50%"],
          splitNumber: 100, //刻度数量
          startAngle: 200,
          endAngle: -20,

          axisLine: {
            show: true,
            lineStyle: {
              width: 15,
              color:
                that.data.deviceStatus == "3"
                  ? [
                      [0.25, "#F80C0C"],
                      [0.5, "#F80C0C"],
                      [0.75, "#F80C0C"],
                      [1, "#F80C0C"],
                    ]
                  : [
                      [0.25, "#F41FAC"],
                      [0.5, "#FCD20C"],
                      [0.75, "#04E00E"],
                      [1, "#0264B1"],
                    ],
            },
          },
          //分隔线样式。
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
            fontSize: 25,
            rotate: 0,
            distance: 225,
            color: that.color,
            formatter: function(params: any) {
              return that.rate + "%";
            },
          },
          axisTick: {
            show: false,
            splitNumber: 100,
            length: 5,
            distance: -20,
          },
          pointer: {
            show: true, //是否显示指针
            length: "100%",
            width: "5%",
          },

          //仪表盘详情，用于显示数据。
          detail: {
            show: true,
            offsetCenter: ["0", "13%"],
            textStyle: {
              fontSize: 20,
              color: that.color,
            },
            formatter: (params: any) => {
              return that.rate + "%";
            },
          },
          data: [
            {
              name: "订单达成率",
              value: that.rate,
              itemStyle: {
                color: that.color,
              },
              title: {
                color: "#A9DDEE",
                offsetCenter: ["0%", "95%"],
                fontSize: 9,
              },
              detail: {
                color: that.color,
                offsetCenter: ["0%", "70%"],
              },
            },
          ],
          markPoint: {
            animation: false,
            silent: true,
            data: [
              {
                x: "50%",
                y: "50%",
                symbol: "diamond",
                symbolSize: 15,
                itemStyle: {
                  color: that.color,
                },
              },
            ],
          },
        },
      ],
    };
  }

  private myChart: any;

  private chartDom: any;

  mounted() {
    this.chartDom = this.$refs.myChart;
  }

  @Watch("data", { deep: true, immediate: true })
  onDataChanged(newValue: any, oldValue: any) {
    if (newValue.currentCompleteCount && newValue.planProductCount) {
      this.rate = Number(
        (
          (newValue.currentCompleteCount / newValue.planProductCount) *
          100
        ).toFixed(0)
      );
    }
    this.$nextTick(() => {
      if (this.chartDom) {
        this.myChart = this.$echarts && this.$echarts.init(this.chartDom);
        this.myChart.setOption(this.option);
      }
    });
  }
}
</script>

<style lang="scss">
.chart {
  margin-bottom: 20px;
  width: 100%;
}
</style>

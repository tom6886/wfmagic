/** 首页行政区划的数据 */
export interface AdministrativeAreaDatum {
  /** 行政区划数字代码 */
  xzqhszDm: string;
  /** 行政区划名称 */
  xzqhmc: string;
  /** 行政区划类型 */
  xzqhlx: AdministrativeAreaType;
  /** 子节点数据集合 */
  children?: AdministrativeAreaDatum[];
}

/**
 * 首页行政区划的类型
 * 1: 省, 2: 市, 3: 区县
 */
export type AdministrativeAreaType = "1" | "2" | "3";

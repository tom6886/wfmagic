/*
 * @Author: Zhang Qiaodi
 * @Date: 2021-11-30 18:16:12
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2021-12-02 01:45:23
 * @FilePath: /xfwl-screen/src/model/common.ts
 * @Description: 描述
 */
export interface R<T> {
  code: string | number;
  msg: string;
  data: T;
}

export interface NewPassWord {
  oldOne: string;
  newOne: string;
  newAgain: string;
}

export interface Page<T> {
  pageNum: number;
  pageSize: number;
  pages: number;
  total: number;
  list: T[];
}

export interface ResPage {
  pageNum: string;
  pages: string;
  total: string;
  pageSize: string;
  list: object[];
}

export interface NoPge<T> {
  list: T[];
}

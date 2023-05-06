import { R, ResPage, Page } from "@/model/common";
import dayjs from "dayjs";

export function transData(data: object) {
  if (!data || !isR(data) || !data.data || typeof data.data !== "object") {
    return data;
  }

  let _data = data.data;

  if (isPage(_data)) {
    let _page: Page<any> = {
      pageNum: parseInt(_data.pageNum),
      pages: parseInt(_data.pages),
      total: parseInt(_data.total),
      pageSize: parseInt(_data.pageSize),
      list: _data.list,
    };

    data.data = _page;
    return data;
  }

  return data;
}

function isR(object: any): object is R<any> {
  return "code" in object && "msg" in object && "data" in object;
}

function isPage(object: any): object is ResPage {
  return (
    "pageNum" in object &&
    "pages" in object &&
    "total" in object &&
    "pageSize" in object &&
    "list" in object
  );
}

//将对象转为浏览器参数
export function toUrlParameter(obj: any) {
  //定义一个空数组
  let ary = [];
  let str;
  //对象的遍历操作
  for (let i in obj) {
    //将对象名push到数组里
    if (obj[i] && "" !== obj[i]) {
      ary.push(i);
      //对象的值
      ary.push(`=${obj[i]}&`);
    }
  }
  //将数组转变成字符串
  str = ary.join("");
  //将字符串最后一个&符剪切走
  str = str.slice(0, str.length - 1);
  return str;
}

export function trimData(data: any) {
  if (data) {
    if (data instanceof Object) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if (typeof data[key] == "string") {
            data[key] = data[key].trim();
          }
        }
      }
    } else if (data instanceof Array) {
      for (let index = 0; index < data.length; index++) {
        if (typeof data[index] == "string") {
          data[index] = data[index].trim();
        }
      }
    }
  }
  return data;
}

/**
 * 日期格式化
 */
export function formatDate(date: Date, fmt: string) {
  function padLeftZero(str: string) {
    return ("00" + str).substr(str.length);
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  let o: any = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }
  return fmt;
}

/**
 * 获取最近N天
 * @param num
 * @returns
 */
export function lastNDays(length = 10) {
  return Array.from({ length }, (v, k) =>
    dayjs()
      .subtract(k, "day")
      .format("MM/DD")
  ).reverse();
}

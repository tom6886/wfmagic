/*
 * @Author: Zhang Qiaodi
 * @Date: 2021-11-30 18:16:44
 * @LastEditors: Zhang Qiaodi
 * @LastEditTime: 2021-12-02 23:18:17
 * @FilePath: /xfwl-screen/.eslintrc.js
 * @Description: 描述
 */

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};

/* eslint-disable no-unused-vars */
const Mock = require("mockjs");
const { permissions } = require("./routes.js");

module.exports = [
  // mock get all routes form server
  {
    url: "/power-admin/routes",
    type: "get",
    response: _ => {
      return {
        code: 20000,
        data: permissions,
        info: { name: Mock.Random.first() }
      };
    }
  }
];
